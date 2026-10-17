import { toProjectCard } from '../../entities/project/index.ts';
import { listProjects } from '../../entities/project/index.server.ts';
import { usedBy } from '../../entities/technology/index.ts';
import { listTechnologies } from '../../entities/technology/index.server.ts';
import { ProjectsPage } from '../../pages/projects/index.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta } from '../../shared/lib/seo/index.ts';
import type { ShouldRevalidateFunction } from 'react-router';
import type { Route } from './+types/projects';

export function loader() {
  const catalog = listTechnologies();
  const projects = listProjects().map((project) => toProjectCard(project, catalog));
  return { projects, technologies: usedBy(catalog, projects) };
}

/** Filtering only changes the query string: the data is already there, no need to reload it. */
export const shouldRevalidate: ShouldRevalidateFunction = ({ currentUrl, nextUrl, defaultShouldRevalidate }) =>
  currentUrl.pathname !== nextUrl.pathname && defaultShouldRevalidate;

export const meta: Route.MetaFunction = ({ location }) => buildMeta({ ...seo.pages.projects, path: location.pathname });

export default function Projects({ loaderData }: Route.ComponentProps) {
  return <ProjectsPage {...loaderData} />;
}
