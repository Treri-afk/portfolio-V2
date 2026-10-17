import type { SubHeadingLevel } from '../../../../shared/ui/index.ts';
import type { ProjectCard } from '../../model/types.ts';

export interface ProjectCardProps {
  project: ProjectCard;
  headingLevel?: SubHeadingLevel | undefined;
}
