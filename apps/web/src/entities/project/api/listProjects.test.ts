import { describe, expect, it } from 'vitest';
import { listProjects } from './listProjects.ts';

/** Every Markdown case study in shared/content must satisfy the contract: a broken file fails CI, not the build. */
describe('project content', () => {
  const projects = listProjects();

  it('parses and validates every published case study', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('keeps slugs unique and sorted by editorial order', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects.map((project) => project.sortOrder)).toEqual(projects.map((project) => project.sortOrder).toSorted((a, b) => a - b));
  });

  it('gives every project exactly one cover at most', () => {
    for (const project of projects) expect(project.media.filter((media) => media.isCover).length).toBeLessThanOrEqual(1);
  });
});
