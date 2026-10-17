import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '../src/lib/rateLimit.ts';

describe('createRateLimiter', () => {
  it('opens a new window once the previous one ends', () => {
    const limiter = createRateLimiter(1, 1000);
    expect(limiter.allow('a', 0)).toBe(true);
    expect(limiter.allow('a', 10)).toBe(false);
    expect(limiter.allow('b', 10)).toBe(true);
    expect(limiter.allow('a', 1000)).toBe(true);
  });

  it('stays bounded: the oldest key is evicted past the cap', () => {
    const limiter = createRateLimiter(1, 1000, 2);
    limiter.allow('a', 0);
    limiter.allow('b', 0);
    limiter.allow('c', 0);
    expect(limiter.allow('a', 0)).toBe(true);
    expect(limiter.allow('c', 0)).toBe(false);
  });
});
