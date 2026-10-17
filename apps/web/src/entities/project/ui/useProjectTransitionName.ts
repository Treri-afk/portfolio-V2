import { useViewTransitionState } from 'react-router';
import { projectPath, projectTransitionName } from '../model/projectPath.ts';

/** Names the card visual only while navigating to its case study, so it morphs into the case study hero. */
export function useProjectTransitionName(slug: string): string | undefined {
  const isTransitioning = useViewTransitionState(projectPath(slug));
  return isTransitioning ? projectTransitionName(slug) : undefined;
}
