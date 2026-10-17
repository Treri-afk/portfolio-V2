import type { Project, ProjectDecision, ProjectMedia, ProjectOrigin, ProjectPhase, Technology } from '@portfolio/contracts';

/** What a project card needs: no Markdown bodies, technologies resolved. */
export interface ProjectCard {
  slug: string;
  title: string;
  tagline: string;
  year: number;
  origin: ProjectOrigin;
  cover: ProjectMedia | null;
  keyDecision: ProjectDecision | null;
  phases: ProjectPhase[];
  technologies: Technology[];
}

export type ProjectDetail = Omit<Project, 'technologies'> & { technologies: Technology[] };
