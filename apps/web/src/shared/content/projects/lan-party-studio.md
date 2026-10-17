---
slug: lan-party-studio
title: LAN Party Studio
tagline: Une régie de streaming 100 % hors ligne qui capte les écrans de plusieurs PC et les envoie dans OBS.
summary: Application Electron en deux modes, régie et client, reliés en WebRTC par un SFU mediasoup découvert automatiquement sur le réseau local.
role: Conception de l'architecture et développement complet de l'application.
year: 2026
status: published
featured: true
sortOrder: 3
origin: personal
technologies: [electron, react, typescript, webrtc, nodejs, zod]
keyDecision:
  challenge: Diffuser l'écran de n'importe quel PC d'une LAN, sans internet ni carte de capture par machine.
  decision: "Un SFU mediasoup supervisé et trois couches simulcast : la régie lit la couche basse, OBS la haute, le PC joueur n'encode qu'une fois."
lifecycle:
  - phase: product
    summary: Deux modes, régie et client, et une intégration à OBS qui ne recrée ni ses scènes ni ses transitions.
  - phase: code
    summary: Electron, mediasoup et un protocole WebSocket typé, partagé entre les deux modes.
metrics:
  - label: de coupure à la relance du serveur média
    value: "≈ 2"
    unit: s
    source: Mesure documentée dans le README du projet
  - label: couches simulcast par flux
    value: "3"
    source: Configuration de l'encodeur côté client
  - label: dépendance internet
    value: "0"
    source: Aucun serveur STUN/TURN, découverte mDNS
  # TODO(metric): nombre de PC lors d'une vraie LAN, latence glass-to-glass mesurée
---
## context
Pendant une LAN party, on veut diffuser l'écran de n'importe quel joueur en direct, avec des transitions propres, sans compte, sans cloud et sans câbler une carte de capture par PC.

## problem
Capter plusieurs écrans en 1080p60 pendant que des jeux tournent, avec une latence quasi nulle, sur un réseau local parfois bloqué, et laisser OBS garder ses scènes, ses transitions et son mixage.

## role
J'ai conçu l'architecture en trois couches, le protocole de signalisation et le développement des deux modes de l'application.

## approach
- **SFU mediasoup dans un processus supervisé** : relancé automatiquement s'il tombe, les clients se reconnectent seuls et republient.
- **Choix orientés latence** : H264 accéléré par le GPU, simulcast 3 couches (la régie consomme la basse, la sortie OBS la haute), tampon de gigue à zéro, Opus à 10 ms, capture Windows Graphics Capture.
- **Découverte mDNS** avec repli sur saisie d'IP, et **code de session** à six chiffres pour la régie et la page de sortie.
- **OBS reste maître** : chaque flux est une Browser Source, en mur composé ou en source dédiée par PC.

## architecture
Trois couches strictement séparées : capture et envoi côté client, réception et routage dans le processus principal de la régie (mediasoup, WebSocket, mDNS, HTTP), et interface React sans logique métier. Les types du protocole WebSocket sont partagés par les deux côtés et validés par Zod.

## results
- Fonctionne sans internet : aucun serveur externe, aucun compte.
- Un PC qui redémarre retrouve sa case dans la grille et republie sa source sans intervention.

## learnings
Le projet n'est ni versionné ni testé. Le protocole de signalisation, déjà typé et partagé, se prêterait bien à des tests de contrat ; c'est par là que je commencerais.
