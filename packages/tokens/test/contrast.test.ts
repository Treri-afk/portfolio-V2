import { wcagContrast } from 'culori';
import { describe, expect, it } from 'vitest';
import { readTokens, resolve, type SourceToken } from './tokens.ts';

const tokens = readTokens();
const AA_TEXT = 4.5;

const SURFACES = ['color.surface.base', 'color.surface.raised', 'color.surface.sunken'];
const TEXTS = ['color.text.primary', 'color.text.secondary', 'color.text.muted', 'color.text.accent', 'color.state.success', 'color.state.danger'];
const PAIRS = [
  ...TEXTS.flatMap((text) => SURFACES.map((surface) => [text, surface] as const)),
  ['color.text.on-accent', 'color.accent.default'] as const,
  ['color.text.on-accent', 'color.accent.hover'] as const,
];

const color = (path: string, theme: 'light' | 'dark'): string => {
  const token: SourceToken | undefined = tokens.find((candidate) => candidate.path === path);
  if (!token) throw new Error(`Unknown token ${path}`);
  return resolve(theme === 'dark' && token.dark ? token.dark : token.value, tokens);
};

/** WCAG AA (4.5:1) for every text/surface pair, in both themes. */
describe.each(['light', 'dark'] as const)('%s theme', (theme) => {
  it.each(PAIRS)('%s on %s reaches AA', (text, surface) => {
    expect(wcagContrast(color(text, theme), color(surface, theme))).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
