import type { ProjectMedia } from '@portfolio/contracts';
import type { MediaSizes } from '@portfolio/tokens/media';
import type { MediaRatio } from '../../../../shared/ui/index.ts';

export interface ProjectCoverProps {
  title: string;
  cover: ProjectMedia | null;
  ratio: MediaRatio;
  sizes: MediaSizes;
  priority?: boolean | undefined;
  transitionName?: string | undefined;
  reveal?: boolean | undefined;
}
