import type { Technology } from '@portfolio/contracts';

/** Catalog entries actually used by at least one of the given projects, in catalog order. */
export function usedBy(catalog: readonly Technology[], projects: readonly { technologies: readonly Technology[] }[]): Technology[] {
  const used = new Set(projects.flatMap((project) => project.technologies.map((technology) => technology.slug)));
  return catalog.filter((technology) => used.has(technology.slug));
}
