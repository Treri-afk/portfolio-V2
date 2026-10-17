import { describe, expect, it } from 'vitest';
import { nextOf } from './nextOf.ts';

const items = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];

describe('nextOf', () => {
  it('returns the following item and wraps around', () => {
    expect(nextOf(items, 'a')?.slug).toBe('b');
    expect(nextOf(items, 'c')?.slug).toBe('a');
  });
});
