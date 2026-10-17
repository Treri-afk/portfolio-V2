import { describe, expect, it } from 'vitest';
import { readTokens, withoutReferences } from './tokens.ts';

const derived = readTokens().filter((token) => token.tier !== 'primitive');

/** Semantic and component tokens only point at other tokens: every raw value lives in a primitive. */
describe('semantic and component tokens', () => {
  it.each(derived.map((token) => [token.path, token.value]))('%s is an alias', (_, value) => {
    expect(value).toMatch(/\{[^}]+\}/);
    expect(withoutReferences(value)).not.toMatch(/\d/);
  });

  it.each(derived.filter((token) => token.dark !== undefined).map((token) => [token.path, token.dark]))('%s dark value is an alias', (_, dark) => {
    expect(dark).toMatch(/^\{[^}]+\}$/);
  });
});
