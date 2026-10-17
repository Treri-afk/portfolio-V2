import type { ProjectCardData } from '../../entities/project/index.ts';
import { NextProjectBlock } from './NextProjectBlock.tsx';

/** Ends every case study on the next one (nothing when there is a single project). */
export function NextProject({ project }: { project: ProjectCardData | undefined }) {
  return project ? <NextProjectBlock project={project} /> : null;
}
