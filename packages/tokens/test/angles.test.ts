import { describe, expect, it } from 'vitest';
import { readTokens, resolve } from './tokens.ts';

const tokens = readTokens();
const angles = tokens.filter((token) => resolve(token.value, tokens).endsWith('deg'));

/** CLAUDE.md §6: never 0°, 45°, 90° or any multiple of 45°; always between 2° and 20° in absolute value. */
describe('angle tokens', () => {
  it('exist', () => {
    expect(angles.length).toBeGreaterThan(0);
  });

  it.each(angles.map((token) => [token.path, resolve(token.value, tokens)]))('%s = %s stays within the slant range', (_, value) => {
    const degrees = Math.abs(Number.parseFloat(value));
    expect(value).toMatch(/deg$/);
    expect(degrees).toBeGreaterThanOrEqual(2);
    expect(degrees).toBeLessThanOrEqual(20);
    expect(degrees % 45).not.toBe(0);
  });
});
