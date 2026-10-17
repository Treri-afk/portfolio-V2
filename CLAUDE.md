# Portfolio — règles du projet

Portfolio premium orienté preuves d'expertise. Les projets sont le produit ; le design les sert ; le code est lui-même une preuve.

## Stack
> Périmètre actuel (ADR 0001) : npm workspaces, front seul. Docker, API, base, lint, tests et CI ci-dessous restent la cible.

- Monorepo pnpm :
  - `apps/web` — React 19 + Vite + TypeScript + React Router v7 (framework mode, pré-rendu)
  - `apps/api` — Hono + Drizzle ORM + PostgreSQL
  - `packages/tokens` — design tokens (JSON DTCG → Style Dictionary)
  - `packages/contracts` — schémas Zod et types partagés web ⇄ api
  - `packages/config` — ESLint, Stylelint, tsconfig partagés
- Docker + Docker Compose en dev et en prod. Caddy en frontal de prod.
- Versionnement GitHub (`Treri-afk/portfolio-V2`) : pull requests, checks GitHub Actions obligatoires avant merge.
- TypeScript strict partout. Zod pour toute donnée qui traverse une frontière.

## Commandes (npm workspaces — voir docs/adr/0001)
| Commande | Rôle |
|---|---|
| `npm run dev` | build des tokens puis serveur de dev du front (http://localhost:5173) |
| `npm run build` | build de production + pré-rendu de toutes les pages |
| `npm run preview` | sert le build pré-rendu |
| `npm run tokens:build` | JSON DTCG → `tokens.css`, `custom-media.css`, `media.ts`, `favicon.svg` |
| `npm run media -w @portfolio/web` | variantes AVIF/WebP des images (incrémental, lancé par `dev` et `build`) |
| `npm run typecheck` | `tsc` sur chaque workspace (typegen React Router inclus) |

Docker, API, base, lint, tests et CI : prévus, pas encore en place.

## Règles non négociables

### 1. Zéro valeur en dur
Toute valeur de design vient d'un token : couleur, police, taille de texte, graisse, interlignage, approche, espacement, dimension, ratio, rayon, bordure, ombre, opacité, z-index, durée, easing, angle, breakpoint.
- Source unique : `packages/tokens/src/**/*.json`. Aucun autre fichier ne contient de valeur brute.
- Trois niveaux : `primitive` → `semantic` → `component`. Les composants consomment `semantic` ou `component`, jamais `primitive`.
- Valeurs neutres autorisées hors tokens : `0`, `1`, `100%`, `auto`, `none`, `inherit`, `currentColor`, `transparent`, `1fr`.
- Valeur manquante → créer un token. Jamais de contournement. `eslint-disable` / `stylelint-disable` interdits sauf justification commentée validée en revue.
- Textes du site : centralisés dans `apps/web/src/shared/content`. Contenu des projets : en base.

### 2. Une responsabilité par fichier
- Cible 15–20 lignes utiles. ESLint bloque à 25 (hors lignes vides et commentaires). Exceptions : schémas DB, configs, tests, migrations, tokens JSON.
- Anatomie d'un composant :
  ```
  Name/
    Name.tsx          rendu uniquement
    Name.module.css   style uniquement
    Name.types.ts     props
    useName.ts        logique (si besoin)
    index.ts          API publique
  ```
- Calcul pur → `lib/`. Un handler API = une route. Une requête SQL = une fonction de repository.

### 3. Réutiliser avant de créer
- Avant tout nouveau composant, hook ou util : chercher dans `shared/` et `entities/`. Proche à 80 % → ajouter une variante typée (`variant`, `data-variant`), pas un nouveau composant.
- jscpd : zéro duplication. knip : zéro fichier, export ou dépendance mort.
- Inventaire dans `apps/web/src/shared/ui/README.md` : une ligne par composant (nom — responsabilité — variantes).

### 4. Architecture
**Web — Feature-Sliced Design** : `app → pages → widgets → features → entities → shared`.
- Imports vers les couches inférieures uniquement (eslint-plugin-boundaries). Import d'un slice via son `index.ts`, jamais en profondeur.
- `pages` : composition de widgets, aucune logique.
- `widgets` : blocs de page autonomes.
- `features` : une interaction utilisateur (filtrer, contacter, changer de thème).
- `entities` : modèle métier (`project`, `technology`) + UI atomique.
- `shared` : `ui/`, `lib/`, `api/`, `config/`, `content/`.

**API** : `routes → handler → service (si logique métier) → repository → db`. Aucun accès DB hors repository.

### 5. Animation : performance d'abord
Ordre de préférence :
1. Transitions et animations CSS (durées et easings en tokens).
2. CSS scroll-driven animations (`animation-timeline: view()`) dans `@supports` ; contenu visible et lisible sans support.
3. View Transitions API via React Router (`viewTransition`, `useViewTransitionState`) : transitions de page et élément partagé.
4. Motion (`motion/react`, `LazyMotion` + `m`) uniquement pour la présence (montage/démontage) et le layout (réordonnancement).

Propriétés animées autorisées : `transform`, `opacity`, `clip-path`, `filter`.
Interdits : boucles `requestAnimationFrame`, écouteurs `scroll`/`mousemove`/`resize` qui calculent des styles, animation de `width/height/top/left/margin`, smooth scroll JS, scroll hijacking, curseur custom, WebGL/canvas décoratif, preloader.
`prefers-reduced-motion: reduce` → durées à zéro, géré dans les tokens, pas composant par composant.

### 6. Angles
- Uniquement via les tokens `angle.*`. Jamais 0°, 45°, 90° ni multiple de 45°. Plage : 2° à 20° en valeur absolue. Un test Vitest dans `packages/tokens` le garantit.
- Le texte n'est jamais incliné. On incline les conteneurs, les découpes (`clip-path`) et les traits.
- Un seul composant de découpe (`Slice`), un seul de trait (`SlantRule`). Aucune autre implémentation d'inclinaison.

### 7. TypeScript et React
- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `noImplicitOverride`.
- Interdits : `any`, `!` non-null, `as` (sauf `as const`), `enum` (unions ou objets `as const`), `useEffect` pour un état dérivé ou un fetch, `dangerouslySetInnerHTML`.
- React Compiler activé : pas de `useMemo` / `useCallback` manuels sans mesure.
- Types d'API importés depuis `packages/contracts`, jamais redéclarés.

### 8. Sécurité et accessibilité (minimum)
- Validation Zod à chaque entrée : body, params, query, env.
- SQL via Drizzle uniquement ; jamais de `sql.raw` avec une entrée utilisateur.
- URLs issues de la DB : `https:` uniquement (schéma Zod). Liens externes `rel="noopener noreferrer"`.
- Secrets via env validée au démarrage ; seul `.env.example` est versionné.
- HTML sémantique, un `h1` par page, focus visible (token), contraste AA vérifié par test sur les tokens, `alt` obligatoire (`NOT NULL` en DB).

### 9. Langue
Code, noms, commits (Conventional Commits) : anglais. Contenu affiché : français.

### 10. Git et Docker
- `main` protégée. Une branche par phase ou fonctionnalité, pull request vers `main`, merge uniquement avec checks verts.
- Commits atomiques. Jamais de secret, de `.env`, de build ni de `node_modules` dans Git.
- Dépôt public : aucune donnée personnelle sensible (téléphone, adresse, date de naissance).
- Demander mon accord avant tout `git push`, création de pull request ou déploiement.
- Runtime dev (web, api, db) dans Docker ; pnpm sur l'hôte pour l'outillage et l'éditeur.
- Même version de Node, épinglée, en dev, CI et prod.
- Images multi-stage, utilisateur non-root, base minimale épinglée par digest, `HEALTHCHECK`, `.dockerignore` strict.
- Postgres jamais publié en prod. Migrations via un service dédié avant le démarrage de l'API.

## Workflow multi-agents
- **Agent principal** : conçoit et code. Ne valide jamais seul son travail.
- **`code-reviewer`** : après chaque phase ou lot cohérent de changements, avant commit.
- **`security-auditor`** : dès qu'un changement touche `apps/api`, la DB, un formulaire, des en-têtes HTTP, l'env, des dépendances, un Dockerfile, un fichier compose, `.github/workflows/` ou le déploiement.
- Les deux sont en lecture seule : lance-les en parallèle quand les deux s'appliquent, en leur donnant le périmètre (commit de départ, fichiers).
- Corriger chaque « Bloquant », relancer l'agent concerné. Trois itérations maximum, puis me demander.

## Definition of Done
`pnpm check` vert · GitHub Actions vert · `code-reviewer` APPROUVÉ · `security-auditor` OK (si concerné) · décisions structurantes notées dans `docs/adr/`.
