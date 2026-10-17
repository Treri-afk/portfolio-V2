#!/usr/bin/env bash
# Déploie le portfolio sur le VPS depuis le Mac : build du site, copie, API de contact dans Docker, nginx.
#
#   ./deploy/deploy.sh            build + site + API (le .env du VPS n'est jamais écrasé)
#   ./deploy/deploy.sh --nginx    installe aussi la config nginx (sauvegarde, test, rechargement ou retour arrière)
#   ./deploy/deploy.sh --logs     suit les journaux de l'API
#
# Variables : DEPLOY_HOST (galerie, alias SSH), DOMAIN (paulabraham.fr), ALLOW_DIRTY=1 (arbre non commité). Voir docs/adr/0008.
set -euo pipefail
cd "$(dirname "$0")/.."

HOST=${DEPLOY_HOST:-galerie}
DOMAIN=${DOMAIN:-paulabraham.fr}
API_PORT=3050                        # aussi dans deploy/nginx/portfolio.conf et le .env du VPS
DIR=portfolio-v2                     # dans le home de l'utilisateur SSH
WEB_ROOT=/var/www/portfolio-v2
CONTAINER=portfolio-api
# Même Node qu'en dev et en CI. Le digest prime sur le tag : changer .nvmrc impose de mettre à jour NODE_DIGEST.
NODE_VERSION=24.22.0
NODE_DIGEST=sha256:44fce696f38ba8c987c4db89954051000bbd05ffd8d8659ba15ed4a8602e937f
IMAGE="node:$NODE_VERSION-alpine@$NODE_DIGEST"
[ "$(cat .nvmrc)" = "$NODE_VERSION" ] || { echo "✖ .nvmrc ($(cat .nvmrc)) ≠ NODE_VERSION ($NODE_VERSION) : mettre à jour la version et le digest." >&2; exit 1; }
[[ $DOMAIN =~ ^[a-z0-9.-]+$ && $HOST =~ ^[A-Za-z0-9._@-]+$ ]] || { echo '✖ DOMAIN ou DEPLOY_HOST invalide.' >&2; exit 1; }

nginx=false logs=false
for a in "$@"; do
  case $a in
    --nginx) nginx=true ;;
    --logs) logs=true ;;
    *) echo "Option inconnue : $a" >&2; exit 1 ;;
  esac
done

if $logs; then ssh "$HOST" "docker logs -f --tail 100 $CONTAINER"; exit; fi

# Ce qui part en production doit être commité (ALLOW_DIRTY=1 pour passer outre).
if [ -n "$(git status --porcelain)" ] && [ "${ALLOW_DIRTY:-0}" != 1 ]; then
  echo '✖ Modifications non commitées : commiter avant de déployer (ou ALLOW_DIRTY=1).' >&2; exit 1
fi

# ── 1. Build : le gate complet d'abord, puis le site avec les URL de production
echo "▶ Vérifications (npm run check)"
npm run check
echo "▶ Build de production pour https://$DOMAIN"
VITE_SITE_URL="https://$DOMAIN" VITE_API_URL="https://$DOMAIN" npm run build

# ── 2. Copie : site, sources de l'API et manifestes du workspace (npm ci a besoin de tous les package.json)
echo "▶ Copie vers $HOST:~/$DIR"
ssh "$HOST" "mkdir -p $DIR/site $DIR/app/apps/api $DIR/app/apps/web $DIR/app/packages/contracts $DIR/app/packages/tokens"
rsync -az --delete apps/web/build/client/ "$HOST:$DIR/site/"
rsync -az --delete --exclude node_modules --exclude '.env*' --exclude test --exclude vitest.config.ts \
  apps/api/ "$HOST:$DIR/app/apps/api/"
rsync -az --delete --exclude node_modules --exclude test --exclude vitest.config.ts \
  packages/contracts/ "$HOST:$DIR/app/packages/contracts/"
rsync -az package.json package-lock.json .npmrc .nvmrc "$HOST:$DIR/app/"
rsync -az apps/web/package.json "$HOST:$DIR/app/apps/web/"
rsync -az packages/tokens/package.json "$HOST:$DIR/app/packages/tokens/"

# ── 3. Le .env de production n'est jamais copié ni écrasé : on vérifie seulement qu'il existe
if ! ssh "$HOST" "test -f $DIR/app/apps/api/.env"; then
  echo "✖ $DIR/app/apps/api/.env absent sur $HOST." >&2
  echo "  Le créer à partir de apps/api/.env.example (ALLOWED_ORIGIN=https://$DOMAIN, PORT=$API_PORT), chmod 600." >&2
  exit 1
fi

# ── 4. API : dépendances de production dans l'image Node, puis conteneur durci (lecture seule, sans privilèges)
echo "▶ API de contact ($CONTAINER, 127.0.0.1:$API_PORT)"
ssh "$HOST" "cd $DIR/app && docker run --rm -u \"\$(id -u):\$(id -g)\" -e HOME=/tmp -v \"\$PWD\":/app -w /app '$IMAGE' \
  npm ci --omit=dev -w @portfolio/api --no-audit --no-fund"
ssh "$HOST" "cd $DIR/app && docker rm -f $CONTAINER >/dev/null 2>&1 || true; docker run -d --name $CONTAINER \
  --restart unless-stopped -p 127.0.0.1:$API_PORT:$API_PORT -e HOST=0.0.0.0 -u \"\$(id -u):\$(id -g)\" \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=16m --cap-drop ALL --security-opt no-new-privileges \
  --memory 192m --cpus 0.5 --pids-limit 100 \
  -v \"\$PWD\":/app:ro -w /app/apps/api '$IMAGE' node --env-file=.env src/server.ts >/dev/null"
ssh "$HOST" "for i in 1 2 3 4 5 6 7 8 9 10; do curl -fsS -m 2 http://127.0.0.1:$API_PORT/health >/dev/null && exit 0; sleep 1; done; \
  docker logs --tail 20 $CONTAINER; exit 1"

# ── 5. Site : publication dans la racine nginx
echo "▶ Publication du site dans $WEB_ROOT"
ssh "$HOST" "sudo rsync -a --delete --chown=root:root --chmod=D755,F644 $DIR/site/ $WEB_ROOT/"

# ── 6. nginx (--nginx) : Cloudflare real IP, quota, site ; test avant rechargement, retour arrière sinon
if $nginx; then
  echo "▶ Config nginx"
  rsync -az deploy/nginx/ "$HOST:$DIR/nginx/"
  ssh "$HOST" 'bash -s' <<REMOTE
set -euo pipefail
cd $DIR/nginx
# Plages Cloudflare : chaque ligne doit être un CIDR, et chaque famille doit en compter plusieurs.
curl -fsS -m 10 https://www.cloudflare.com/ips-v4 -o cf-v4.txt
curl -fsS -m 10 https://www.cloudflare.com/ips-v6 -o cf-v6.txt
grep -Evq '^[0-9.]+/[0-9]+\$' cf-v4.txt && { echo 'ips-v4 inattendu' >&2; exit 1; }
grep -Evq '^[0-9a-f:]+/[0-9]+\$' cf-v6.txt && { echo 'ips-v6 inattendu' >&2; exit 1; }
[ "\$(wc -l < cf-v4.txt)" -ge 5 ] && [ "\$(wc -l < cf-v6.txt)" -ge 3 ] || { echo 'listes Cloudflare trop courtes' >&2; exit 1; }
{ echo '# Cloudflare devant $DOMAIN : CF-Connecting-IP cru uniquement depuis ses plages (ADR 0007).'
  sed 's/.*/set_real_ip_from &;/' cf-v4.txt cf-v6.txt
  echo 'real_ip_header CF-Connecting-IP;'; } > cloudflare-realip.conf
# Trois fichiers installés : chacun est sauvegardé, puis restauré (ou retiré s'il n'existait pas) si nginx -t échoue.
stamp=\$(date +%Y%m%d%H%M%S)
files="cloudflare-realip.conf:/etc/nginx/snippets/cloudflare-realip.conf portfolio-contact.conf:/etc/nginx/conf.d/portfolio-contact.conf portfolio.conf:/etc/nginx/sites-available/portfolio"
for f in \$files; do dst=\${f#*:}; [ -f "\$dst" ] && sudo cp "\$dst" "\$dst.bak-\$stamp"; sudo cp "\${f%%:*}" "\$dst"; done
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
if sudo nginx -t; then sudo systemctl reload nginx; exit 0; fi
for f in \$files; do dst=\${f#*:}; if [ -f "\$dst.bak-\$stamp" ]; then sudo mv "\$dst.bak-\$stamp" "\$dst"; else sudo rm -f "\$dst"; fi; done
[ -f /etc/nginx/sites-available/portfolio ] || sudo rm -f /etc/nginx/sites-enabled/portfolio
echo 'nginx -t a échoué : configuration précédente restaurée' >&2; exit 1
REMOTE
fi

# ── 7. Vérification publique
echo "▶ Vérification de https://$DOMAIN"
for path in / /projets /contact; do
  code=$(curl -s -o /dev/null -m 15 -w '%{http_code}' "https://$DOMAIN$path")
  echo "  $path → $code"
  [ "$code" = 200 ] || { echo "✖ $path ne répond pas 200" >&2; exit 1; }
done
echo "✔ Déployé sur https://$DOMAIN"
