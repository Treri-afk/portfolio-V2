import { z } from 'zod';

const DEFAULT_PORT = 3000;
const APP_PASSWORD_LENGTH = 16;

/** https only, except the local dev server. */
const origin = z.url().refine((url) => url.startsWith('https://') || new URL(url).hostname === 'localhost');

/** Validated at startup: the server refuses to start with a missing or invalid value. */
export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORT),
  // 0.0.0.0 only inside a container whose port is published on the host loopback (deploy/deploy.sh).
  HOST: z.enum(['127.0.0.1', '0.0.0.0']).default('127.0.0.1'),
  ALLOWED_ORIGIN: origin,
  SMTP_USER: z.email(),
  // Gmail app password (not the account password): 16 letters, shown with spaces.
  SMTP_PASS: z.string().transform((value) => value.replaceAll(' ', '')).pipe(z.string().length(APP_PASSWORD_LENGTH)),
  CONTACT_TO: z.email(),
});
