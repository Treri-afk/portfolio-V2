import { parse, rgb } from 'culori';
import { describe, expect, it } from 'vitest';
import { readTokens } from './tokens.ts';

/**
 * Design rule: never pure black (#000) nor pure white (#fff). Darks and lights are tinted neutrals,
 * softer on screen and in tune with the warm palette. Checked on every raw color, hence every alias.
 */
const colors = readTokens()
  .filter((token) => token.tier === 'primitive')
  .flatMap((token) => {
    const parsed = parse(token.value);
    return parsed ? [[token.path, rgb(parsed)] as const] : [];
  });

/** One 8-bit step: anything closer to an extreme counts as that extreme. */
const STEP = 1 / 255;
const channels = (color: (typeof colors)[number][1]) => [color.r, color.g, color.b];

describe('color extremes', () => {
  it('reads the color primitives', () => {
    expect(colors.length).toBeGreaterThan(0);
  });

  it.each(colors)('%s is not pure black', (_path, color) => {
    expect(channels(color).every((channel) => channel < STEP)).toBe(false);
  });

  it.each(colors)('%s is not pure white', (_path, color) => {
    expect(channels(color).every((channel) => channel > 1 - STEP)).toBe(false);
  });
});
