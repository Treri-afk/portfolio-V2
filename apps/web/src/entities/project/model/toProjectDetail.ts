import type { Project, Technology } from '@portfolio/contracts';
import { resolveTechnologies } from './resolveTechnologies.ts';
import type { ProjectDetail } from './types.ts';

export function toProjectDetail(project: Project, catalog: readonly Technology[]): ProjectDetail {
  return { ...project, technologies: resolveTechnologies(project.technologies, catalog) };
}
