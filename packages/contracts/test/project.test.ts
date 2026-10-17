import { describe, expect, it } from 'vitest';
import { projectSchema } from '../src/index.ts';

const valid = {
  slug: 'demo',
  title: 'Demo',
  tagline: 'Une ligne.',
  summary: 'Résumé.',
  role: 'Tout.',
  year: 2026,
  status: 'published',
  featured: false,
  sortOrder: 1,
  origin: 'personal',
  technologies: ['react'],
  sections: [{ kind: 'context', bodyMd: 'Texte.' }],
};

describe('projectSchema', () => {
  it('accepts a minimal project and fills defaults', () => {
    const project = projectSchema.parse(valid);
    expect(project.metrics).toEqual([]);
    expect(project.lifecycle).toEqual([]);
  });

  it('rejects unknown keys (strict)', () => {
    expect(projectSchema.safeParse({ ...valid, extra: true }).success).toBe(false);
  });

  it.each(['http://example.com', 'javascript:alert(1)', 'data:text/html,x'])('rejects the non-https link %s', (liveUrl) => {
    expect(projectSchema.safeParse({ ...valid, liveUrl }).success).toBe(false);
  });

  it('requires an alt text on every image', () => {
    const media = [{ kind: 'image', src: '/media/demo/a.jpg', width: 10, height: 10, alt: '' }];
    expect(projectSchema.safeParse({ ...valid, media }).success).toBe(false);
  });

  it('only accepts self-hosted media paths', () => {
    const media = [{ kind: 'image', src: 'https://evil.example/a.jpg', width: 10, height: 10, alt: 'x' }];
    expect(projectSchema.safeParse({ ...valid, media }).success).toBe(false);
  });
});
