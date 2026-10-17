import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { legalLinks } from '../shared/content/index.ts';

export default [
  index('routes/home.tsx'),
  route('projets', 'routes/projects.tsx'),
  route('projets/:slug', 'routes/project.tsx'),
  route('a-propos', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
  ...legalLinks.map((link) => route(link.slug, 'routes/legal.tsx', { id: `legal-${link.slug}` })),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
