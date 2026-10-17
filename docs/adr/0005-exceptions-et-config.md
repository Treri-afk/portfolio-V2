# 0005 — Exceptions au langage incliné, configuration publique

- Statut : accepté (17/10/2026)
- **Volet de transition de page** (`app/styles/view-transitions.css`) : c'est une découpe inclinée hors `Slice`, assumée. La View Transitions API anime des pseudo-éléments (`::view-transition-new(root)`) qu'aucun composant ne peut porter. Elle utilise le même token d'angle (`angle.transition.page`).
- **`SlantRule`** est le seul trait incliné : un court filet d'accent décoratif (couvertures typographiques). Le trait qui traversait la page a été retiré à la demande du propriétaire du site.
- **Thèmes** : les règles `color-scheme` et `--scheme-inverse` sont générées avec les tokens (`tokens.css`), pas dans `app/` : `Slice` (couche `shared`) n'en dépend plus.
- **Configuration publique** : `VITE_API_URL` et `VITE_SITE_URL` sont validées par Zod au démarrage de Vite (`apps/web/env.schema.ts`), https obligatoire en production. Le code client ne fait que les lire, sans embarquer Zod. Sans `VITE_API_URL`, le formulaire se déclare indisponible au lieu d'envoyer les données vers une adresse par défaut.
- **Limite de 25 lignes utiles** : en plus des exceptions de `CLAUDE.md` (schémas DB, configs, tests, migrations, tokens JSON), elle ne s'applique pas à l'outillage de build (`packages/tokens/build/*`, `apps/web/scripts/*`), aux schémas Zod d'un seul objet (`packages/contracts`) ni aux fichiers de contenu (`apps/web/src/shared/content`). Ce sont des données ou des configurations, pas de la logique.
