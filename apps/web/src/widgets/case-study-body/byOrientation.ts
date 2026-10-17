import type { ProjectMedia } from '@portfolio/contracts';

/** Phone captures (portrait) and screen captures (landscape) are laid out on different grids. */
export function byOrientation(media: readonly ProjectMedia[]): { portrait: ProjectMedia[]; landscape: ProjectMedia[] } {
  return {
    portrait: media.filter((item) => item.height > item.width),
    landscape: media.filter((item) => item.height <= item.width),
  };
}
