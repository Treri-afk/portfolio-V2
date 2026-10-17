import type { Project, Technology } from '@portfolio/contracts';
import { coverOf } from './coverOf.ts';
import { resolveTechnologies } from './resolveTechnologies.ts';
import type { ProjectCard } from './types.ts';

export function toProjectCard(project: Project, catalog: readonly Technology[]): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    year: project.year,
    origin: project.origin,
    cover: coverOf(project),
    keyDecision: project.keyDecision ?? null,
    phases: project.lifecycle.map((step) => step.phase),
    technologies: resolveTechnologies(project.technologies, catalog),
  };
}
