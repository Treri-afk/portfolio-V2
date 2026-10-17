---
slug: crm-ia
title: CRM IA
tagline: Un CRM de freelance qui couvre le cycle complet, du devis à l'export comptable.
summary: Clients, devis, factures, contrats avec signature électronique, abonnements, projets, suivi du temps, portail client et coffre-fort d'identifiants.
role: Conception et développement full stack.
year: 2026
status: published
featured: false
sortOrder: 8
origin: personal
technologies: [nextjs, react, typescript, nodejs, express, prisma, mysql, docker]
---
## context
Un outil de gestion pensé pour une activité freelance : tout ce qui se passe entre le premier contact et le paiement, au même endroit.

## approach
- Front Next.js et API Express séparés, données MySQL via Prisma.
- Authentification par JWT en cookie httpOnly, identifiants clients chiffrés dans un coffre-fort dédié.
- Portail client pour consulter devis, factures et contrats signés.
