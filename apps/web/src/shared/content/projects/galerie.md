---
slug: galerie
title: Galerie
tagline: Une vitrine et une boutique qu'une artiste peintre modifie seule, sans pouvoir casser la mise en page.
summary: Catalogue d'œuvres, panier et paiement Stripe, édition en place des textes et des images, administration des commandes et des statistiques.
role: Conception, développement full stack, sécurisation de la base et déploiement.
year: 2026
duration: juillet → octobre 2026
status: published
featured: true
sortOrder: 2
origin: client
repoUrl: https://github.com/Treri-afk/galerie
technologies: [nextjs, react, typescript, supabase, postgresql, stripe, tailwind]
keyDecision:
  challenge: Laisser une artiste tout modifier, sans qu'elle puisse casser la mise en page ni ouvrir la base au public.
  decision: Aucune écriture directe en table. Des fonctions Postgres SECURITY DEFINER exigent un secret serveur, puis sont fermées au public.
  codeUrl: https://github.com/Treri-afk/galerie/blob/main/supabase/migrations/0008_lock_admin_functions.sql
  codeLabel: 0008_lock_admin_functions.sql
lifecycle:
  - phase: product
    summary: Parcours d'achat, administration et édition en place pensés pour une utilisatrice non technique.
  - phase: code
    summary: Next.js, Supabase et Stripe ; neuf migrations SQL, dont deux de durcissement.
  - phase: production
    summary: Mise en ligne avec en-têtes de sécurité, limitation de débit et verrou anti-force-brute sur la connexion.
metrics:
  - label: fonctions Postgres d'écriture
    value: "6"
    source: Migrations SQL du dépôt (SECURITY DEFINER)
  - label: migrations de schéma
    value: "9"
    source: Dossier supabase/migrations du dépôt
  - label: espaces d'administration
    value: "7"
    source: Œuvres, contenu, commandes, e-mails, statistiques, tableau de bord, art & santé
  # TODO(metric): commandes passées, temps d'édition gagné par l'artiste, score Lighthouse
---
## context
Une artiste peintre voulait présenter et vendre ses œuvres en ligne, et garder la main sur ses textes et ses images sans dépendre d'un développeur à chaque changement.

## problem
Donner une vraie liberté d'édition à une personne non technique, sans lui donner le pouvoir de casser le design, et sans exposer la base de données : sur Supabase, la tentation est d'utiliser la clé de service côté serveur pour toutes les écritures.

## role
J'ai conçu le site et l'administration, développé le front et le back, écrit et durci les migrations SQL, intégré Stripe et déployé le site.

## approach
- **Écritures uniquement via des fonctions Postgres `SECURITY DEFINER`**, qui exigent un secret serveur de 192 bits. La clé publique ne peut que lire ; l'écriture directe en table est bloquée par RLS. Une dernière migration ferme ces fonctions au public : seul le serveur peut encore les appeler.
- **Édition en place** : chaque texte modifiable est encadré sur le site lui-même, avec sauvegarde automatique. Le cadrage et la largeur des images se règlent sans toucher à la structure.
- **Mise en page figée par conception** : l'artiste modifie le contenu, jamais la disposition.
- **Durcissement progressif** : limitation de débit, verrou anti-force-brute sur la connexion, en-têtes de sécurité, montée de version de Next.js pour corriger la CVE-2025-55182.

## architecture
Next.js (App Router) pour les pages publiques et l'administration, Supabase pour la base, le stockage des images et les fonctions d'écriture, Stripe pour le paiement. Le site fonctionne aussi sans configuration, avec un contenu de démonstration.

## results
- L'artiste modifie textes, images et cadrages depuis le site, sans accès technique.
- Aucune écriture possible depuis le navigateur : la sécurité repose sur la base, pas sur le front.

## learnings
Le projet n'a pas de tests automatisés : les fonctions SQL d'écriture sont exactement le genre de code que je couvrirais aujourd'hui en premier, par des tests d'intégration sur une base jetable.
