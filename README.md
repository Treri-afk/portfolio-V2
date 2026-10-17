# Portfolio — Paul-Abraham Froitier

Développeur full stack. Ce dépôt est le code de mon portfolio, et il en fait partie : architecture, design system, typage et méthode sont faits pour être lus.

Le site présente mes projets sous forme d'études de cas : contexte, problème, décisions techniques, résultats chiffrés et sourcés, ce que je ferais autrement.

## Lancer le projet

Prérequis : Node.js 24 (version exacte dans `.nvmrc`). Variables publiques facultatives : `VITE_API_URL` et `VITE_SITE_URL`, en https en production, validées par Zod au démarrage de Vite.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de production + pré-rendu de toutes les pages
```

## Ce que montre ce dépôt

- **Un design system sans valeur en dur.** Couleurs, tailles, espacements, angles, durées, grilles, largeurs d'images : tout vient de tokens JSON au format DTCG, compilés par Style Dictionary. La règle est tenue par revue de code ; le lint qui la rendra bloquante est la prochaine étape.
- **Des pages pré-rendues.** React Router 8 en framework mode, `ssr: false` + `prerender` : chaque page est un fichier HTML statique, hydraté ensuite.
- **Du contenu validé.** Les études de cas sont des fichiers Markdown avec front-matter, validés au build par des schémas Zod partagés. Un contenu invalide casse le build, jamais la page du visiteur.
- **Une architecture lisible.** Feature-Sliced Design (`app → pages → widgets → features → entities → shared`), une responsabilité par fichier, imports uniquement vers les couches inférieures.
- **La performance mesurée.** Lighthouse sur le build de production, chiffres ci-dessous.

## Architecture

```
portfolio V2/
├─ apps/web/                     React 19 · React Router 8 · Vite 8 · CSS Modules
│  ├─ scripts/build-media.ts     images AVIF et WebP aux largeurs des tokens (sharp)
│  └─ src/
│     ├─ app/                    racine, routes (loader + meta + page), styles globaux
│     ├─ pages/                  composition de widgets, aucune logique
│     ├─ widgets/                blocs de page autonomes (hero, grille, étude de cas…)
│     ├─ features/               interactions : filtre par techno, contact, thème
│     ├─ entities/               modèle métier : project, technology
│     └─ shared/                 ui (design system), lib, api, config, content (textes et Markdown)
├─ packages/tokens/              tokens DTCG → tokens.css, custom-media.css, media.ts, favicon.svg
├─ packages/contracts/           schémas Zod et types partagés (web, puis API)
└─ docs/adr/                     décisions d'architecture
```

Flux des données au build :

```
shared/content/projects/*.md ──► *.server.ts (front-matter YAML + Zod) ──► loaders React Router
                                                                              │
                                                    pré-rendu ◄───────────────┘
                                                        │
                                       HTML statique + données hydratées
```

Le code qui lit le Markdown, le YAML et les schémas Zod vit dans des modules `*.server.ts`. React Router refuse de les envoyer au navigateur.

## Choix techniques

| Besoin | Choix | Pourquoi |
|---|---|---|
| Routing et SEO | React Router 8, `ssr: false` + `prerender` | HTML statique par page, meta et Open Graph par projet, View Transitions intégrées |
| Style | CSS Modules + Lightning CSS | zéro runtime, `@custom-media` générés depuis les tokens |
| Tokens | Style Dictionary, format DTCG | une source pour le CSS, les media queries, les images et le favicon |
| Thèmes | paires `light-dark()` + `color-scheme` | un bloc inversé change de thème sans dupliquer une seule règle |
| Découpes inclinées | `clip-path` + `tan()` + unités `cqi` | calculées en CSS, sans JavaScript |
| Formulaires et filtres | React Aria Components | clavier, focus et ARIA sans réécrire ; chargé seulement sur les pages qui s'en servent |
| Validation | Zod, partagé dans `packages/contracts` | une seule définition des types, du contenu jusqu'à l'API |
| Performance | React Compiler, images AVIF/WebP, une feuille de style | mémoïsation automatique, images à la bonne taille |

Le détail des arbitrages est dans [`docs/adr/`](docs/adr).

## Design system

- **Trois niveaux de tokens** : primitifs (`color.neutral.950`), sémantiques (`color.text.primary`), composants (`button.height`). Les composants ne lisent jamais les primitifs.
- **Contraste AA** mesuré pour chaque paire texte/surface, dans les deux thèmes (script ponctuel ; le test Vitest qui le garantira est prévu).
- **Angles** bornés entre 2° et 20°, jamais à 45° ni à l'un de ses multiples. Un seul composant découpe la page (`Slice`), un seul trace un trait incliné (`SlantRule`) ; le volet de transition de page est l'exception documentée dans l'ADR 0005.
- **Mouvement** limité à `transform`, `opacity` et `clip-path`. Les durées passent à zéro quand l'utilisateur réduit les animations, directement dans les tokens.
- Inventaire des composants : [`apps/web/src/shared/ui/README.md`](apps/web/src/shared/ui/README.md).

## Performance

Lighthouse 13, build de production, octobre 2026.

| Page | Mobile (4G simulée) | Ordinateur | Accessibilité · Bonnes pratiques · SEO |
|---|---|---|---|
| Accueil | 85 | 99 | 100 · 100 · 100 |
| Projets | 85 | — | 100 · 100 · 100 |
| Étude de cas | 82 | 99 | 100 · 100 · 100 |
| À propos | 90 | — | 100 · 100 · 100 |
| Contact | 87 | — | 100 · 100 · 100 |

JavaScript initial de l'accueil : environ 128 Ko gzip. CLS : 0 sur mobile.

## Méthode

Le développement est assisté par l'IA (Claude Code), avec un cadre écrit avant le code :

- [`CLAUDE.md`](CLAUDE.md) fixe les règles non négociables : zéro valeur en dur, une responsabilité par fichier, architecture, sécurité, accessibilité.
- [`.claude/agents/`](.claude/agents) définit deux relecteurs en lecture seule : `code-reviewer` (qualité, architecture, tokens, accessibilité) et `security-auditor` (OWASP, chaîne d'approvisionnement).
- Chaque décision structurante est tracée dans une ADR.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | tokens, images, puis serveur de développement (variables validées au démarrage) |
| `npm run build` | build de production et pré-rendu |
| `npm run preview` | sert le build (tester les pages avec un `/` final) |
| `npm run tokens:build` | compile les tokens |
| `npm run typecheck` | TypeScript strict sur tous les paquets |

## État

| Fait | À venir |
|---|---|
| Design system, pages, études de cas, pages légales | API Hono + PostgreSQL pour le formulaire de contact |
| Pré-rendu, SEO, thèmes clair et sombre | Lint qui bloque les valeurs en dur, tests Vitest et Playwright |
| Passe de performance | Docker, CI GitHub Actions, mise en ligne |

## Contenus

Les textes, études de cas et visuels appartiennent à Paul-Abraham Froitier. Toute réutilisation demande une autorisation écrite.
