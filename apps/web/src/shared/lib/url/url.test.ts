import { describe, expect, it } from 'vitest';
import { isExternalHref, isSafeHref } from './index.ts';

describe('isSafeHref', () => {
  it.each(['https://github.com', 'mailto:a@b.fr', '/projets/arkade'])('accepts %s', (href) => {
    expect(isSafeHref(href)).toBe(true);
  });

  it.each(['//evil.example', 'http://example.com', 'javascript:alert(1)', 'data:text/html,x', 'projets'])('rejects %s', (href) => {
    expect(isSafeHref(href)).toBe(false);
  });
});

describe('isExternalHref', () => {
  it('treats https and mailto as external, site paths as internal', () => {
    expect(isExternalHref('https://github.com')).toBe(true);
    expect(isExternalHref('mailto:a@b.fr')).toBe(true);
    expect(isExternalHref('/contact')).toBe(false);
  });
});
