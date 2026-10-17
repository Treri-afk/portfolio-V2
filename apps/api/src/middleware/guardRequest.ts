import type { Context } from 'hono';
import { refuse } from '../lib/refuse.ts';
import type { RateLimiter } from '../lib/rateLimit.ts';

export interface GuardDeps {
  allowedOrigin: string;
  clientLimiter: RateLimiter;
  clientKey: (c: Context) => string | null;
}

/**
 * Refuses before reading the body: other origins (a no-cors form post skips the CORS preflight),
 * non-JSON bodies, unidentified clients and clients over their quota. Null when the request may go on.
 */
export function guardRequest(c: Context, { allowedOrigin, clientLimiter, clientKey }: GuardDeps): Response | null {
  if (c.req.header('origin') !== allowedOrigin) return refuse(c, 'forbidden');
  if (!c.req.header('content-type')?.startsWith('application/json')) return refuse(c, 'unsupported_media_type');
  const key = clientKey(c);
  if (key === null) {
    console.error('contact: missing or invalid X-Real-IP, check the nginx proxy_set_header');
    return refuse(c, 'unavailable');
  }
  return clientLimiter.allow(key) ? null : refuse(c, 'rate_limited');
}
