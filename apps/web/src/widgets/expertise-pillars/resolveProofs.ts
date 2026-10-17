import type { ProjectCardData } from '../../entities/project/index.ts';

/** Proof slugs → projects that actually exist (an unpublished proof is simply not shown). */
export function resolveProofs(slugs: readonly string[], projects: readonly ProjectCardData[]): ProjectCardData[] {
  return slugs.flatMap((slug) => projects.filter((project) => project.slug === slug));
}
