export const pillars = {
  eyebrow: 'Expertise',
  title: 'Trois choses que je sais faire, et où le vérifier.',
  proofLabel: 'Preuves',
  items: [
    {
      title: 'Interfaces React soignées',
      text: 'Composants typés, accessibles au clavier, animés sans bloquer le rendu, pilotés par des design tokens.',
      proofs: ['arkade', 'galerie'],
    },
    {
      title: 'Produits de bout en bout',
      text: 'Schéma, API typée, sécurité des écritures, Docker et CI : je livre et j’exploite ce que je construis.',
      proofs: ['arkade', 'galerie', 'crm-ia'],
    },
    {
      title: 'Temps réel et outils métier',
      text: 'Matchmaking, régie vidéo en WebRTC, automatisations qui font gagner du temps aux équipes.',
      proofs: ['lan-party-studio', 'arkade'],
    },
  ],
} as const;
