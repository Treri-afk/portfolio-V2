import type { ProjectMedia } from '@portfolio/contracts';

/** The project's cover visual, or null when only a typographic cover can be shown. */
export function coverOf({ media }: { media: readonly ProjectMedia[] }): ProjectMedia | null {
  return media.find((item) => item.isCover) ?? null;
}
