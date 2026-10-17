/** Legal pages: this list drives the routes (app/routes.ts) and the footer links; each slug has a Markdown file. */
export const privacyPolicy = { slug: 'confidentialite', to: '/confidentialite', label: 'Confidentialité' } as const;

export const legalLinks = [
  { slug: 'mentions-legales', to: '/mentions-legales', label: 'Mentions légales' },
  privacyPolicy,
  { slug: 'conditions-utilisation', to: '/conditions-utilisation', label: 'Conditions d’utilisation' },
] as const;

export const legalLabels = {
  eyebrow: 'Informations légales',
  updated: 'Mise à jour le',
  navLabel: 'Informations légales',
} as const;
