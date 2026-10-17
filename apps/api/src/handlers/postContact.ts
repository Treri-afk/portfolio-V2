import { contactInputSchema } from '@portfolio/contracts';
import type { Context } from 'hono';
import { isBot } from '../lib/honeypot.ts';
import { httpStatus } from '../lib/httpStatus.ts';
import { refuse } from '../lib/refuse.ts';
import { contactMail } from '../services/contactMail.ts';
import { guardRequest } from '../middleware/guardRequest.ts';
import type { ContactDeps } from './contactDeps.ts';

/** POST /v1/contact: guards, shared Zod contract, daily cap, then mail. 202 on success; a filled honeypot gets the same 202, unsent. */
export function postContact(deps: ContactDeps) {
  return async (c: Context) => {
    const refusal = guardRequest(c, deps);
    if (refusal) return refusal;
    const body: unknown = await c.req.json().catch(() => null);
    if (isBot(body)) return c.body(null, httpStatus.accepted);
    const parsed = contactInputSchema.safeParse(body);
    if (!parsed.success) return refuse(c, 'invalid');
    if (!deps.dailyLimiter.allow('all')) return refuse(c, 'rate_limited');
    await deps.send(contactMail(parsed.data, deps.to));
    return c.body(null, httpStatus.accepted);
  };
}
