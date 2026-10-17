import { serve } from '@hono/node-server';
import { createApp } from './app.ts';
import { envSchema } from './env.ts';
import { clientKey } from './lib/clientKey.ts';
import { createRateLimiter, type RateLimiter } from './lib/rateLimit.ts';
import { gmailSender } from './services/gmailSender.ts';

/** 5 messages per client and per 10 minutes; 50 mails a day in all (Gmail allows about 500). */
const CLIENT_LIMIT = 5;
const CLIENT_WINDOW_MS = 600_000;
const DAILY_LIMIT = 50;
const DAY_MS = 86_400_000;

const daily = createRateLimiter(DAILY_LIMIT, DAY_MS);
// The daily cap blocks every visitor until the next day: say so in the logs.
const dailyLimiter: RateLimiter = {
  allow: (key, now) => daily.allow(key, now) || (console.warn('contact: daily mail cap reached'), false),
};

const env = envSchema.parse(process.env);
// No nginx on the dev server: one shared key there. Production origins are https, never localhost.
const isLocal = new URL(env.ALLOWED_ORIGIN).hostname === 'localhost';
const app = createApp({
  allowedOrigin: env.ALLOWED_ORIGIN,
  to: env.CONTACT_TO,
  send: gmailSender(env.SMTP_USER, env.SMTP_PASS),
  clientLimiter: createRateLimiter(CLIENT_LIMIT, CLIENT_WINDOW_MS),
  dailyLimiter,
  clientKey: isLocal ? (c) => clientKey(c) ?? 'localhost' : clientKey,
});

// Loopback only: nginx is the single entry point (TLS, X-Real-IP).
serve({ fetch: app.fetch, port: env.PORT, hostname: '127.0.0.1' });
