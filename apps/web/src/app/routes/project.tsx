import { coverOf, nextOf, toProjectCard, toProjectDetail } from '../../entities/project/index.ts';
import { getProject, listProjects } from '../../entities/project/index.server.ts';
import { listTechnologies } from '../../entities/technology/index.server.ts';
import { ProjectPage } from '../../pages/project/index.ts';
import { buildMeta, creativeWorkJsonLd } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/project';

export function loader({ params }: Route.LoaderArgs) {
  const catalog = listTechnologies();
  const projects = listProjects();
  const project = getProject(params.slug, projects);
  const next = nextOf(projects, project.slug);
  return { project: toProjectDetail(project, catalog), next: next ? toProjectCard(next, catalog) : undefined };
}

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
  const path = location.pathname;
  const { title, tagline, summary, year, liveUrl } = loaderData.project;
  const image = coverOf(loaderData.project)?.src;
  return [...buildMeta({ title, description: tagline, path, image }), creativeWorkJsonLd({ name: title, description: summary, year, url: liveUrl })];
};

export default function Project({ loaderData }: Route.ComponentProps) {
  return <ProjectPage project={loaderData.project} next={loaderData.next} />;
}
