import type { Technology } from '@portfolio/contracts';

/** Technologies as tag items (id = slug), for TagList and TagGroup. */
export function technologyTags(technologies: readonly Technology[]): { id: string; label: string }[] {
  return technologies.map((technology) => ({ id: technology.slug, label: technology.name }));
}
