import { createHash, randomBytes } from 'node:crypto';
import type { Context } from 'hono';
import { z } from 'zod';
import { ipv6Prefix } from './ipPrefix.ts';

const ip = z.union([z.ipv4(), z.ipv6()]);
// Random per process: the hash cannot be reversed or linked across restarts (privacy policy).
const SALT_BYTES = 32;
const SALT = randomBytes(SALT_BYTES);
const HASH_LENGTH = 16;

const fingerprint = (value: string): string => createHash('sha256').update(SALT).update(value).digest('hex').slice(0, HASH_LENGTH);

/**
 * Hashed client address from X-Real-IP, which nginx overwrites ($remote_addr); IPv6 counts per /64.
 * The API listens on 127.0.0.1 only. Null when the header is missing or invalid (nginx misconfigured).
 */
export function clientKey(c: Context): string | null {
  const parsed = ip.safeParse(c.req.header('x-real-ip'));
  if (!parsed.success) return null;
  // Dual-stack listeners report IPv4 clients as ::ffff:a.b.c.d: count them as the IPv4 they are.
  const address = parsed.data.replace(/^::ffff:(?=\d+\.)/i, '');
  return fingerprint(address.includes(':') ? ipv6Prefix(address) : address);
}
