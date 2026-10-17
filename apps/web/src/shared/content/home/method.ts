export const method = {
  eyebrow: 'Méthode',
  title: 'Assisté par l’IA, vérifié à chaque étape.',
  steps: [
    { title: 'Cadrer', text: 'Les règles sont écrites avant le code et versionnées dans le dépôt : architecture, tokens, sécurité.' },
    { title: 'Construire', text: 'Développement assisté par Claude Code, en petites étapes typées de bout en bout.' },
    { title: 'Vérifier', text: 'Chaque lot passe par des agents de revue et de sécurité, puis par la CI. Rien n’est validé par son auteur.' },
    { title: 'Livrer', text: 'Conteneurs, déploiement reproductible, mesures après la mise en ligne.' },
  ],
} as const;
