---
slug: mario-party-lan
title: Mario Party LAN
tagline: Un jeu de plateau multijoueur pour LAN, dont la partie survit à la fermeture des navigateurs.
summary: Plateau, dés, objets, boutique et roue de défis sur de vrais jeux ; chaque joueur joue depuis son propre ordinateur.
role: Conception et développement.
year: 2026
status: published
featured: false
sortOrder: 7
origin: personal
technologies: [react, typescript, vite, supabase]
---
## context
Un « Mario Party » maison pour une LAN de 3 à 5 joueurs sur deux jours : à chaque fin de tour, une roue tire un défi sur les vrais jeux de la soirée.

## approach
- La partie est stockée et synchronisée par Supabase : tout le monde peut fermer son navigateur et reprendre plus tard.
- Rejoindre une partie se fait par un code de quatre caractères ou un lien d'invitation, sans compte.
