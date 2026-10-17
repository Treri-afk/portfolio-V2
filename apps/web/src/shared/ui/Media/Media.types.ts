import type { MediaSizes } from '@portfolio/tokens/media';

export type MediaRatio = 'square' | 'portrait' | 'landscape';

export interface MediaProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Omitted: the image keeps its natural ratio. */
  ratio?: MediaRatio | undefined;
  /** Focal point in percent, used when the ratio crops the image. */
  focalX?: number | undefined;
  focalY?: number | undefined;
  /** Rendered width preset (token): drives which variant the browser downloads. */
  sizes?: MediaSizes | undefined;
  /** Above-the-fold image (LCP): loaded eagerly with high priority. */
  priority?: boolean | undefined;
  /** view-transition-name shared with another page. */
  transitionName?: string | undefined;
  /** Reveal on scroll (CSS scroll-driven animation, when supported). */
  reveal?: boolean | undefined;
  className?: string | undefined;
}
