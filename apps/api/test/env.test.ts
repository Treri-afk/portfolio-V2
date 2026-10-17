import { describe, expect, it } from 'vitest';
import { envSchema } from '../src/env.ts';

const env = { ALLOWED_ORIGIN: 'https://paulabraham.fr', SMTP_USER: 'a@gmail.com', SMTP_PASS: 'abcd efgh ijkl mnop', CONTACT_TO: 'b@gmail.com' };

describe('envSchema', () => {
  it('accepts a Gmail app password with spaces and defaults the port', () => {
    expect(envSchema.parse(env)).toMatchObject({ PORT: 3000, SMTP_PASS: 'abcdefghijklmnop' });
  });

  it.each([{ ALLOWED_ORIGIN: 'http://paulabraham.fr' }, { SMTP_PASS: 'short' }, { CONTACT_TO: '' }])('rejects %o', (override) => {
    expect(envSchema.safeParse({ ...env, ...override }).success).toBe(false);
  });

  it('allows http only for localhost', () => {
    expect(envSchema.safeParse({ ...env, ALLOWED_ORIGIN: 'http://localhost:5173' }).success).toBe(true);
  });
});
