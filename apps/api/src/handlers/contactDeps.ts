import type { RateLimiter } from '../lib/rateLimit.ts';
import type { GuardDeps } from '../middleware/guardRequest.ts';
import type { SendMail } from '../services/contactMail.ts';

export interface ContactDeps extends GuardDeps {
  send: SendMail;
  to: string;
  /** Caps the mails sent per day, whatever their origin, to protect the Gmail account. */
  dailyLimiter: RateLimiter;
}
