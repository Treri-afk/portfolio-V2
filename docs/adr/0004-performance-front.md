# 0004 — Performance du front

- Statut : accepté (17/10/2026)
- Contexte : Lighthouse mobile du build de production à 69 (LCP 6,2 s). Causes : captures de 480 Ko servies en taille d'origine, Zod et YAML expédiés au client, React Aria et react-markdown chargés sur toutes les pages, 6 à 10 feuilles de style bloquantes.
- Décisions :
  - **Images** : `scripts/build-media.ts` (sharp) génère des variantes AVIF et WebP aux largeurs des tokens (`image.width`) ; `Media` sert un `<picture>` avec `srcset` et un préréglage `sizes` tokenisé. Variantes ignorées par Git, régénérées à chaque `dev` et `build`.
  - **Code de build isolé** : l'accès aux données (Markdown, YAML, Zod) passe par des modules `*.server.ts`, que React Router interdit côté client. Les constantes partagées viennent de `@portfolio/contracts/constants`, sans Zod.
  - **`sideEffects`** déclaré dans `apps/web/package.json` : le bundler élague les barrels, React Aria ne charge que sur `/projets` et `/contact`, react-markdown que sur les études de cas et les pages légales.
  - **Bouton natif** au lieu du `Button` de React Aria : accessible tel quel, sans bibliothèque sur chaque page.
  - **Une seule feuille de style** (`cssCodeSplit: false`) : environ 8 Ko gzip pour tout le site.
  - **Script de thème en ligne** (sans guillemets ni `<`, donc sans `dangerouslySetInnerHTML`), au lieu d'un fichier bloquant.
- Résultat (Lighthouse 13, build de production) : mobile 82 à 90, desktop 99 ; accessibilité, bonnes pratiques et SEO à 100 ; CLS 0 sur mobile ; JS initial de l'accueil environ 128 Ko gzip.
- À noter : `vite preview` renvoie l'accueil pour les URL sans `/` final. Il faut mesurer avec `/projets/arkade/` en local ; Caddy (`try_files`) servira le bon fichier en production.
- Médias animés (ajout du 17/10/2026) : le motion logo d'ARKADE est une vidéo MP4 H.264 muette de 1080 px (358 Ko, 4,9 s), rendue par `Clip`. Elle est jouée **une seule fois**, quand la moitié est à l'écran (IntersectionObserver, sans écouteur de scroll), et s'arrête sur le logo complet (WCAG 2.2.2). Son `poster` est l'image fixe (dernière image) : c'est ce qu'on voit avant la lecture, sans JavaScript et avec `prefers-reduced-motion: reduce`, où elle ne joue jamais. `preload="none"` hors priorité. Compromis LCP sur l'étude de cas : le poster d'une `<video>` ne peut pas porter `fetchpriority`. Le WebP animé a été écarté : en encodage avec perte, il laissait des traces sur le fond sombre, et sans perte il pesait 2 à 3 Mo. L'image fixe `src` reste pour Open Graph.
