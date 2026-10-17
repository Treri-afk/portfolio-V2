# 0001 — npm workspaces, front d'abord, Docker reporté

- Statut : accepté (17/10/2026)
- Contexte : priorité donnée à un front visible rapidement. pnpm et Docker ne sont pas installés sur la machine de développement.
- Décision : monorepo en **npm workspaces** (`apps/web`, `packages/tokens`, `packages/contracts`). Pas de Docker, pas d'API, pas de base pour l'instant.
- Conséquences : le contenu des projets vit temporairement en Markdown + front-matter dans `apps/web/src/shared/content/projects/`, validé par les schémas Zod de `packages/contracts`. Ce sont les mêmes fichiers que le seed prévu côté API : le passage à PostgreSQL ne changera ni le format ni les contrats. Docker, l'API Hono et la CI restent au programme.
