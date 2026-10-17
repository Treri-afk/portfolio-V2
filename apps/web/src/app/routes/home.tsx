import { heroVisualOf, toProjectCard } from '../../entities/project/index.ts';
import { listProjects } from '../../entities/project/index.server.ts';
import { listTechnologies } from '../../entities/technology/index.server.ts';
import { HomePage } from '../../pages/home/index.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta, personJsonLd } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/home';

export function loader() {
  const catalog = listTechnologies();
  const projects = listProjects();
  const featured = projects.filter((project) => project.featured);
  return {
    heroVisual: heroVisualOf(featured[0]),
    featured: featured.map((project) => toProjectCard(project, catalog)),
    projects: projects.map((project) => toProjectCard(project, catalog)),
  };
}

export const meta: Route.MetaFunction = ({ location }) => [...buildMeta({ ...seo.pages.home, path: location.pathname, isRoot: true }), personJsonLd()];

export default function Home({ loaderData }: Route.ComponentProps) {
  return <HomePage {...loaderData} />;
}
