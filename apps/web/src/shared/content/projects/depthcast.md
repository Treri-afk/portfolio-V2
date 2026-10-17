---
slug: depthcast
title: DepthCast
tagline: Un roguelite coopératif dont le réseau ignore son transport, documenté décision par décision.
summary: Jeu Godot 4 en GDScript typé, co-op 2 à 4 joueurs en réseau local ou via Steam, avec GDD, règles d'architecture testables et journal de décisions.
role: Game design, architecture et développement.
year: 2026
duration: août → septembre 2026
status: published
featured: false
sortOrder: 6
origin: personal
repoUrl: https://github.com/Treri-afk/depthcast
technologies: [godot, github-actions]
lifecycle:
  - phase: product
    summary: Game design document, règles d'architecture testables et journal de décisions.
  - phase: code
    summary: Scripts GDScript typés, intégration continue et suites de tests.
metrics:
  - label: scripts GDScript typés
    value: "152"
    source: Dossier scripts/ du dépôt
  - label: commits
    value: "69"
    source: Historique Git
---
## context
Un roguelite coopératif où les sorts changent de nature à chaque étage : maîtriser le chaos devient la vraie compétence.

## approach
- **Le jeu ne connaît jamais son transport** : ENet en local pour développer sans compte, Steam pour la distribution.
- **Tout l'état vit dans un objet racine** sérialisable, tout l'aléatoire passe par des flux seedés et nommés : co-op et rejeu par seed en découlent.
- Chaque règle d'architecture a un test formulé comme une question vérifiable en lisant le code.

## architecture
Hôte autoritatif en pair-à-pair : les clients envoient des intentions, jamais des résultats. Les décisions structurantes sont tracées dans un journal (D1 à D8) avec ce qui a été écarté.
