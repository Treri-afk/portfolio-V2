export const projectsPage = {
  eyebrow: 'Projets',
  title: 'Tout ce que j’ai construit, filtrable par technologie.',
  lead: 'Chaque fiche détaille le contexte, les décisions techniques et ce que j’en retiens.',
  filterLabel: 'Filtrer par technologie',
  reset: 'Tout afficher',
  empty: 'Aucun projet ne combine toutes ces technologies.',
  count: (count: number): string => `${String(count)} ${count > 1 ? 'projets' : 'projet'}`,
} as const;
