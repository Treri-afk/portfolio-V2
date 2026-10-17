import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';
import type { ContactDeps } from './handlers/contactDeps.ts';
import { refuse } from './lib/refuse.ts';
import { contactRoute } from './routes/contact.ts';

/** A 5000-character message is at most 20 kB in UTF-8; anything bigger is refused before parsing. */
const BODY_LIMIT = 32_768;
const PREFLIGHT_CACHE_SECONDS = 600;

export function createApp(deps: ContactDeps) {
  const app = new Hono();
  app.use(secureHeaders());
  app.use('/v1/*', cors({ origin: deps.allowedOrigin, allowMethods: ['POST'], allowHeaders: ['content-type'], maxAge: PREFLIGHT_CACHE_SECONDS }));
  app.use('/v1/*', bodyLimit({ maxSize: BODY_LIMIT }));
  app.get('/health', (c) => c.text('ok'));
  app.route('/v1/contact', contactRoute(deps));
  app.onError((error, c) => {
    // Expected refusals (413 from bodyLimit…) keep their status.
    if (error instanceof HTTPException) return error.getResponse();
    // Never log the request body or SMTP details: only the error class.
    console.error('request failed:', error.name);
    return refuse(c, 'unavailable');
  });
  return app;
}
