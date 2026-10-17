# 0002 — `light-dark()` natif, sans polyfill Lightning CSS

- Statut : accepté (17/10/2026)
- Contexte : les couleurs sémantiques sont des paires `light-dark()`. Un bloc `Slice tone="inverse"` bascule son sous-arbre en changeant seulement `color-scheme`. Le polyfill de Lightning CSS fige le thème via des variables globales et casse cette bascule locale.
- Décision : `Features.LightDark` est exclu de la transpilation (`vite.config.ts`). `light-dark()` est Baseline depuis mai 2024.
- Conséquences : navigateurs antérieurs à Chrome 123 / Safari 17.5 / Firefox 120 sans couleurs sémantiques. Acceptable pour la cible (recruteurs, équipes tech).
- Thème par défaut (révision du 17/10/2026) : clair pour tout le monde, quelle que soit la préférence système. Le sombre ne s'active que sur choix explicite (bouton de thème, `data-theme='dark'` mémorisé). Plus de règle `prefers-color-scheme` : l'identité visuelle de référence est la version claire.
