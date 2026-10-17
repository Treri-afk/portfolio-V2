import type { Technology, TechnologyCategory } from '@portfolio/contracts';
import { technologyCategories } from '@portfolio/contracts/constants';

export interface TechnologyGroup {
  category: TechnologyCategory;
  technologies: Technology[];
}

/** Groups the catalog by category, keeping only non-empty groups. */
export function groupByCategory(catalog: readonly Technology[]): TechnologyGroup[] {
  return technologyCategories
    .map((category) => ({ category, technologies: catalog.filter((technology) => technology.category === category) }))
    .filter((group) => group.technologies.length > 0);
}
