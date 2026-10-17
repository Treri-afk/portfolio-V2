import { describe, expect, it } from 'vitest';
import { filterProjects } from './filterProjects.ts';

const tech = (...slugs: string[]) => slugs.map((slug) => ({ slug }));
const projects = [
  { id: 'arkade', technologies: tech('react', 'drizzle') },
  { id: 'galerie', technologies: tech('react', 'postgresql') },
];

describe('filterProjects', () => {
  it('keeps everything when nothing is selected', () => {
    expect(filterProjects(projects, [])).toHaveLength(2);
  });

  it('requires every selected technology (AND)', () => {
    expect(filterProjects(projects, ['react', 'postgresql']).map((project) => project.id)).toEqual(['galerie']);
  });
});
