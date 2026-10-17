import type { Technology } from '@portfolio/contracts';

/** Slugs → catalog entries. An unknown slug is a content error and fails the build. */
export function resolveTechnologies(slugs: readonly string[], catalog: readonly Technology[]): Technology[] {
  return slugs.map((slug) => {
    const technology = catalog.find((candidate) => candidate.slug === slug);
    if (!technology) throw new Error(`Unknown technology "${slug}"`);
    return technology;
  });
}
