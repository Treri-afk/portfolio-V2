export interface RateLimiter {
  /** True while the key stays within its quota for the current window. */
  allow: (key: string, now?: number) => boolean;
}

/** Fixed window per key, in memory (one API process). At most `maxKeys` entries: the oldest is evicted. */
export function createRateLimiter(limit: number, windowMs: number, maxKeys = 10_000): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    allow(key, now = Date.now()) {
      const entry = hits.get(key);
      if (entry && entry.resetAt > now) {
        entry.count += 1;
        return entry.count <= limit;
      }
      hits.delete(key);
      const oldest = hits.keys().next();
      if (hits.size >= maxKeys && !oldest.done) hits.delete(oldest.value);
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    },
  };
}
