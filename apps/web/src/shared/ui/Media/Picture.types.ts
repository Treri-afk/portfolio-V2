import type { MediaSizes } from '@portfolio/tokens/media';

export interface PictureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: MediaSizes;
  priority: boolean;
}
