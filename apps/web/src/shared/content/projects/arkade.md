---
slug: arkade
title: ARKADE
tagline: Un ranked communautaire pour 2XKO, de la file d'attente au cashprize.
summary: Matchmaking façon FACEIT, ELO maison, salles de match, tournois et boutique en jetons, synchronisés avec un bot Discord par webhooks signés.
role: Conception produit, développement full stack, déploiement et exploitation.
year: 2026
# TODO(metric): durée réelle du projet (l'historique Git ne couvre que du 5 au 12 octobre 2026)
status: published
featured: true
sortOrder: 1
origin: personal
liveUrl: https://arkade.paulabraham.fr
repoUrl: https://github.com/Treri-afk/arkade
technologies: [nextjs, react, typescript, motion, tailwind, drizzle, sqlite, zod, docker, nginx, github-actions]
keyDecision:
  challenge: Du temps réel sans serveur WebSocket, compatible avec un hébergement serverless.
  decision: "Un sondage adaptatif fait avancer le matchmaking à chaque requête : 1,2 s en recherche, 0,7 s pendant l'acceptation, 6 s au repos."
  codeUrl: https://github.com/Treri-afk/arkade/blob/main/src/components/app/matchmaking.tsx
  codeLabel: matchmaking.tsx
lifecycle:
  - phase: market
    summary: "Taille de la scène versus, business plan, modèle sponsor, simulateur de revenus, prévisionnel et risques."
  - phase: brand
    summary: Explorations de logo, charte graphique, motion logo et kit média.
  - phase: product
    summary: Règles du classé, moteur ELO, rangs, récompenses et tournois ; contrat d'API et de webhooks du bot Discord.
  - phase: code
    summary: Application Next.js de 39 tables, tests du moteur ELO et des tournois, intégration continue.
  - phase: production
    summary: Docker et nginx sur VPS, HTTPS, sauvegarde toutes les 6 heures, mode maintenance, alertes d'erreur.
  - phase: operations
    summary: Plan de lancement de saison, runbook, charte de modération, guide du serveur Discord, plan de mesure pour les sponsors.
metrics:
  - label: tables dans le schéma
    value: "39"
    source: Schéma Drizzle du dépôt, octobre 2026
  - label: accessibilité Lighthouse
    value: "100"
    unit: /100
    source: Audit Lighthouse de la page d'accueil, octobre 2026
  - label: fichiers de tests
    value: "13"
    source: Tests node:test du moteur ELO, des tournois et de la réputation
  - label: sets simulés dans la démo
    value: "≈ 1 600"
    source: Seed de démonstration (37 joueurs)
  # TODO(metric): joueurs inscrits et sets réellement joués
media:
  - kind: image
    src: /media/arkade/phone-classement.jpg
    width: 1080
    height: 2341
    alt: Classement d'ARKADE sur mobile, podium des trois meilleurs joueurs de la saison avec leurs badges de rang enflammés.
    isCover: true
    focalY: 72
  - kind: image
    src: /media/arkade/phone-accueil.jpg
    width: 1080
    height: 2341
    alt: Accueil d'ARKADE sur mobile avec le slogan « Insert coin. Climb. » et le bouton Lancer une partie.
    focalY: 22
  - kind: image
    src: /media/arkade/match-trouve.jpg
    width: 1920
    height: 1200
    alt: Écran « Match trouvé » d'ARKADE, deux joueurs face à face de part et d'autre d'une ligne oblique, bouton Accepter au centre.
  - kind: image
    src: /media/arkade/victoire.jpg
    width: 1920
    height: 1200
    alt: Résultat d'un set gagné 2-1, avec le nouvel ELO, le détail du calcul et les récompenses débloquées.
  - kind: image
    src: /media/arkade/phone-jouer.jpg
    width: 1080
    height: 2341
    alt: Écran Jouer sur mobile avec le gros bouton d'arcade et le match de tournoi en cours.
    focalY: 31
  - kind: image
    src: /media/arkade/phone-recap.jpg
    width: 1080
    height: 2341
    alt: Récapitulatif de saison sur mobile, ELO actuel, pic de saison, classement, taux de victoire et sets joués.
    focalY: 31
documents:
  - title: Étude de marché et business plan
    summary: Taille de la scène versus en 2026, modèle sponsor, simulateur de revenus, prévisionnel et risques, sources citées.
    phase: market
    src: /media/arkade/doc-etude-de-marche.jpg
    width: 1920
    height: 1333
    alt: Page « La scène versus en 2026 » de l'étude de marché, avec le graphique des inscrits par jeu à l'Evo 2026.
  - title: Charte graphique
    summary: Principes, logo, couleurs, typographies, formes, composants et ton, pour que le site, Discord et les supports parlent d'une seule voix.
    phase: brand
    src: /media/arkade/doc-charte-graphique.jpg
    width: 1920
    height: 1333
    alt: Couverture de la charte graphique d'ARKADE, titre « Salle d'arcade, 2 h du matin » sur fond encre.
  - title: Kit média
    summary: Logos téléchargeables, règles d'usage, palette et textes de présentation pour les partenaires, les créateurs et la presse.
    phase: brand
    src: /media/arkade/doc-kit-media.jpg
    width: 1920
    height: 1333
    alt: Page « À faire, à éviter » du kit média d'ARKADE, suivie de la palette encre et néons.
---
## context
La scène 2XKO naissante n'avait pas de classé communautaire. ARKADE en propose un, pensé comme une salle d'arcade : on lie son Discord, on lance la file, on est apparié à un adversaire de son niveau, et chaque set compte pour la saison.

## problem
Un matchmaking crédible demande beaucoup plus qu'une file d'attente : un classement qui résiste au boost, des scores déclarés par les deux joueurs sans arbitre permanent, des litiges, des tournois, et une communauté qui vit sur Discord plutôt que sur le site.

## role
J'ai conçu le produit et développé l'application de bout en bout : modèle de données, moteur ELO, matchmaking, interfaces, intégration Discord, sécurité, déploiement Docker sur VPS et outillage d'exploitation (sauvegardes, alertes, maintenance).

## approach
- **Temps réel par sondage adaptatif** plutôt que par WebSocket : 1,2 s en recherche, 0,7 s pendant l'acceptation, 6 s au repos, ralenti quand l'onglet est caché. Chaque sondage fait avancer le matchmaking : aucun worker, compatible serverless.
- **ELO maison** : K variable (placement, haut niveau), bonus de marge et de série, bornes par set, bouclier anti-démotion, soft reset de saison. Tout est paramétrable et couvert par des tests.
- **Déclaration croisée des scores** avec validation automatique après 15 minutes et file de litiges pour l'arbitrage.
- **Webhooks sortants en outbox**, signés HMAC et rejoués en cas d'échec, pour que le bot Discord pose rôles et messages sans couplage fort.
- **Sécurité** : OAuth Discord implémenté sans librairie, sessions à jeton haché, CSP à nonce, limitation de débit par type d'action.

## architecture
Trois couches strictes : `lib/` contient le calcul pur partagé client/serveur (ELO, rangs, récompenses), `server/` la logique métier et l'accès aux données (Drizzle sur SQLite), `app/` les pages et routes Next.js. Le bot Discord est un client de l'API, authentifié par jeton Bearer.

## results
- Démo jouable sans compte : un bot accepte le match et confirme le score déclaré.
- Pages auditées à 100 en accessibilité, bonnes pratiques et SEO sur l'accueil, CLS à 0.
- En production sur VPS, avec sauvegarde de la base toutes les 6 heures et page de maintenance pilotable.

## learnings
La landing est la page la plus lourde du site : score de performance Lighthouse à 60, LCP à 4,6 s. Le scroll inertiel, le canvas et la pièce 3D passent avant le contenu. Je les chargerais aujourd'hui à la demande, après le premier rendu, et je mesurerais chaque effet avant de le garder.
