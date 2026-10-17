import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from './index.ts';

describe('parseFrontmatter', () => {
  it('splits YAML data from the Markdown body', () => {
    const { data, body } = parseFrontmatter('---\ntitle: Demo\nyear: 2026\n---\n## context\nTexte.');
    expect(data).toEqual({ title: 'Demo', year: 2026 });
    expect(body).toBe('## context\nTexte.');
  });

  it('returns an empty object when there is no front-matter', () => {
    expect(parseFrontmatter('Texte seul.')).toEqual({ data: {}, body: 'Texte seul.' });
  });

  it('never returns a non-object as data', () => {
    expect(parseFrontmatter('---\n- a\n- b\n---\nx').data).toEqual({});
  });
});
