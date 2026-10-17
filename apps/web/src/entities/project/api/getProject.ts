import type { Project } from '@portfolio/contracts';
import { notFound } from '../../../shared/lib/http/index.ts';
import { listProjects } from './listProjects.ts';

/** Project by slug among the given ones (all published projects by default); 404 otherwise. */
export function getProject(slug: string, projects: readonly Project[] = listProjects()): Project {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw notFound();
  return project;
}
