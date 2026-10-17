// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTheme } from './themeStore.ts';

afterEach(() => {
  delete document.documentElement.dataset.theme;
  vi.unstubAllGlobals();
});

describe('getTheme', () => {
  it('stays light even when the system prefers dark', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(getTheme()).toBe('light');
  });

  it('follows the theme chosen with the toggle', () => {
    document.documentElement.dataset.theme = 'dark';
    expect(getTheme()).toBe('dark');
  });
});
