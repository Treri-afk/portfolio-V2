import type { Technology } from '@portfolio/contracts';
import type { ProjectCardData } from '../../entities/project/index.ts';

export interface ProjectGridProps {
  projects: readonly ProjectCardData[];
  technologies: readonly Technology[];
}
