import type { ProjectCard } from '../../model/types.ts';

export interface ProjectCardProps {
  project: ProjectCard;
  headingLevel?: 2 | 3 | undefined;
}
