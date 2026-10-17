import type { Project } from '@portfolio/contracts';
import { parseProject } from './parseProject.ts';
import { readProjectSources } from './readProjectSources.ts';

/** Published projects, in editorial order. */
export function listProjects(): Project[] {
  return readProjectSources()
    .map(parseProject)
    .filter((project) => project.status === 'published')
    .toSorted((a, b) => a.sortOrder - b.sortOrder);
}
