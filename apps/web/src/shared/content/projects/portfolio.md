---
slug: portfolio
title: Ce portfolio
tagline: Le site que vous lisez, avec un design system tokenisé, des pages pré-rendues et un développement assisté par l'IA.
summary: Monorepo React 19 et React Router 8 en pré-rendu, design tokens au format DTCG, CSS Modules, études de cas en Markdown validées par Zod.
role: Direction artistique, conception, développement et méthode de travail.
year: 2026
duration: octobre 2026
status: published
featured: false
sortOrder: 5
origin: personal
repoUrl: https://github.com/Treri-afk/portfolio-V2
technologies: [react, react-router, typescript, vite, style-dictionary, zod]
keyDecision:
  challenge: Aucune valeur en dur. Chaque couleur, taille, angle ou durée doit venir d'une seule source.
  decision: "Des tokens JSON au format DTCG génèrent le CSS, les media queries, les réglages d'images et le favicon ; les composants ne lisent que des tokens sémantiques."
  codeUrl: https://github.com/Treri-afk/portfolio-V2/tree/main/packages/tokens/src
  codeLabel: packages/tokens
lifecycle:
  - phase: brand
    summary: "Direction artistique éditoriale : découpes inclinées, typographie étendue, un seul accent, thèmes clair et sombre."
  - phase: product
    summary: Cadrage, plan des pages et format des études de cas, écrits avant la première ligne de code.
  - phase: code
    summary: React Router en pré-rendu, Feature-Sliced Design, modules réservés au build, images AVIF et WebP générées.
metrics:
  - label: performance sur ordinateur
    value: "99"
    unit: /100
    source: Lighthouse 13, build de production, accueil et étude de cas, octobre 2026
  - label: accessibilité, bonnes pratiques et SEO
    value: "100"
    unit: /100
    source: Lighthouse 13, build de production, cinq pages, octobre 2026
  - label: performance sur mobile (4G simulée)
    value: 82 à 90
    unit: /100
    source: Lighthouse 13, build de production, cinq pages, octobre 2026
  - label: de JavaScript initial sur l'accueil
    value: "≈ 128"
    unit: Ko
    source: Build de production, fichiers compressés en gzip
media:
  - kind: image
    src: /media/portfolio/mobile-accueil.jpg
    width: 1080
    height: 2341
    alt: Accueil du portfolio sur mobile, nom en grand, deux actions et le visuel d'ARKADE qui entre par la découpe inclinée.
    isCover: true
    focalY: 18
  - kind: image
    src: /media/portfolio/accueil.jpg
    width: 1920
    height: 1200
    alt: Accueil du portfolio sur ordinateur, texte à gauche et capture d'ARKADE à droite.
  - kind: image
    src: /media/portfolio/projets.jpg
    width: 1920
    height: 1200
    alt: Page Projets avec le filtre par technologie et la grille de cartes carrées.
  - kind: image
    src: /media/portfolio/mobile-cycle.jpg
    width: 1080
    height: 2341
    alt: Section « Ce que j'ai pris en charge » d'une étude de cas, sur mobile, avec les étapes du projet.
    focalY: 20
---
## context
Mon ancien portfolio impressionnait mais ne mettait pas mes projets en avant. Celui-ci est construit pour qu'un recruteur comprenne en trente secondes ce que je sais faire, à quel niveau, et avec quelles preuves.

## problem
Montrer de la profondeur sans chercher l'effet « waouh » : un site sobre, rapide et accessible, dont le code lui-même sert de preuve.

## role
J'ai défini la direction artistique, le système de tokens, l'architecture et le contenu, et piloté le développement avec Claude Code.

## approach
- **Tokens à trois niveaux** (primitifs, sémantiques, composants) : couleurs OKLCH en paires `light-dark()`, contraste AA vérifié dans les deux thèmes, angles bornés entre 2° et 20°.
- **Un seul composant de découpe inclinée**, calculée en CSS avec `tan()` et les unités de conteneur : aucun JavaScript pour la mise en page.
- **Pages pré-rendues au build** : le contenu des projets vient de fichiers Markdown validés par des schémas Zod partagés, sans base de données à l'exécution.
- **Le code de build reste au build** : Markdown, YAML et Zod vivent dans des modules `*.server.ts`, que React Router refuse d'envoyer au navigateur.
- **Images AVIF et WebP** générées en plusieurs tailles depuis les tokens ; animations limitées à `transform`, `opacity` et `clip-path`, coupées quand l'utilisateur réduit les animations.

## architecture
Monorepo npm : `apps/web` (React Router en framework mode, Feature-Sliced Design), `packages/tokens` (Style Dictionary) et `packages/contracts` (schémas Zod partagés). Les décisions structurantes sont tracées dans des ADR.

## results
- Accessibilité, bonnes pratiques et SEO à 100 sur les pages mesurées ; performance à 99 sur ordinateur.
- Le JavaScript initial de l'accueil est passé d'environ 250 à 128 Ko compressés après une passe dédiée à la performance.

## learnings
Mesurer avant de corriger : le premier rapport Lighthouse venait du serveur de développement, et une partie des écarts venait de l'outil de prévisualisation, pas du site. Prochaines étapes : l'API de contact, les conteneurs Docker et la mise en ligne.
