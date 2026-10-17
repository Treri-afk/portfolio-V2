export const notFound = {
  eyebrow: 'Erreur 404',
  title: 'Cette page n’existe pas.',
  lead: 'Le lien est peut-être ancien. Les projets, eux, sont toujours là.',
  actions: [
    { to: '/projets', label: 'Voir les projets', variant: 'primary' },
    { to: '/', label: 'Retour à l’accueil', variant: 'secondary' },
  ],
} as const;
