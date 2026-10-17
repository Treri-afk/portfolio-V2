# 0007 — API de contact : Hono, envoi par Gmail, sans base

- Statut : accepté (17/10/2026)
- Contexte : le formulaire de contact existe côté front (validation par le contrat Zod partagé) mais n'avait pas de destinataire. Le site sera servi par nginx sur le VPS personnel, à côté d'ARKADE. Les messages doivent arriver dans la boîte Gmail du propriétaire.
- Décisions :
  - **`apps/api`** : Hono sur Node 24, exécuté directement en TypeScript (suppression des types native), sans étape de build. `routes → handler → service` ; pas de repository tant qu'il n'y a pas de base.
  - **Validation** : le même `contactInputSchema` que le front (strict, champ piège `website` vide, longueurs bornées). Corps limité à 32 Ko avant lecture.
  - **Envoi** : SMTP Gmail via nodemailer, authentifié par un **mot de passe d'application** (jamais le mot de passe du compte). Le compte est l'expéditeur, `Reply-To` est le visiteur ; le nom est ramené à une ligne pour empêcher l'injection d'en-têtes.
  - **Anti-abus** :
    - `Origin` doit valoir `ALLOWED_ORIGIN` (403) et le corps doit être en `application/json` (415) : un formulaire tiers en `no-cors` / `text/plain` ne passe pas.
    - 5 messages par client et par 10 minutes ; **50 mails par jour au total**, pour protéger le compte Gmail même face à un botnet.
    - Client = empreinte SHA-256 salée (sel aléatoire par processus) de `X-Real-IP`, que nginx écrase ; IPv6 compté par /64. L'adresse brute n'est jamais conservée. En-tête absent ou invalide : 503 et trace dans les logs (nginx mal configuré).
    - Limiteur borné à 10 000 clés (éviction de la plus ancienne).
    - Champ piège rempli : 202 sans envoi, le robot ne sait pas qu'il est repéré.
    - L'API n'écoute que sur `127.0.0.1` : rien ne l'atteint sans nginx. Délais SMTP de 10 s.
  - **Configuration** : variables validées par Zod au démarrage (`src/env.ts`) ; le serveur refuse de démarrer si une valeur manque ou est invalide. Seul `.env.example` est versionné. CORS limité à l'origine du site.
  - **Erreurs** : 202 si envoyé (`contactAccepted`, partagé dans `packages/contracts`), 400 invalide, 403 origine, 413 trop gros, 415 type, 429 quota, 503 sinon. Les logs ne contiennent ni le corps, ni l'IP, ni le message d'erreur SMTP (seulement la classe d'erreur).
- nginx (à appliquer au déploiement) :
  ```nginx
  limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;   # bloc http
  location = /v1/contact {
    limit_except POST OPTIONS { deny all; }
    limit_req zone=contact burst=5 nodelay;
    limit_req_status 429;
    client_max_body_size 32k;
    client_body_timeout 10s;
    client_header_timeout 10s;
    proxy_pass http://127.0.0.1:3000;   # valeur de PORT
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;
    proxy_read_timeout 30s;
    proxy_hide_header X-Powered-By;
  }
  location /v1/ { return 404; }
  ```
  Les adresses `::ffff:a.b.c.d` (écoute double pile) sont ramenées à l'IPv4. Le plafond du jour écrit `contact: daily mail cap reached` dans les logs ; un envoi SMTP qui échoue compte quand même dans ce plafond.
  Plus HTTPS seul (redirection 80 → 443, HSTS), `server_tokens off`. `.env` en `chmod 600`, service sous un utilisateur dédié non root.
- Conséquences : pas d'historique des messages hors de la boîte mail ; le quota repart à zéro à chaque redémarrage. Gmail limite l'envoi à quelques centaines de messages par jour, largement suffisant. PostgreSQL et Docker restent prévus (CLAUDE.md) si un besoin de stockage apparaît.
