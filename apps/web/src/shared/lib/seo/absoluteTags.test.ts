import { describe, expect, it } from 'vitest';
import { absoluteTags } from './absoluteTags.ts';

describe('absoluteTags', () => {
  it('emits nothing while the site origin is unknown', () => {
    expect(absoluteTags(undefined, '/projets', '/media/a/b.jpg')).toEqual([]);
  });

  it('builds canonical, og:url and an absolute og:image', () => {
    expect(absoluteTags('https://example.fr', '/projets/arkade', '/media/arkade/cover.jpg')).toEqual([
      { tagName: 'link', rel: 'canonical', href: 'https://example.fr/projets/arkade' },
      { property: 'og:url', content: 'https://example.fr/projets/arkade' },
      { property: 'og:image', content: 'https://example.fr/media/arkade/cover.jpg' },
    ]);
  });
});
