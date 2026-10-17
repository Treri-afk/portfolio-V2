import { describe, expect, it } from 'vitest';
import { contactInputSchema, contactLimits } from '../src/index.ts';

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Bonjour, un poste à pourvoir.', website: '' };

describe('contactInputSchema', () => {
  it('accepts a regular message', () => {
    expect(contactInputSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a filled honeypot (bots)', () => {
    expect(contactInputSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false);
  });

  it('rejects an invalid e-mail', () => {
    expect(contactInputSchema.safeParse({ ...valid, email: 'ada' }).success).toBe(false);
  });

  it('enforces the shared length limits', () => {
    const tooLong = 'x'.repeat(contactLimits.message.max + 1);
    expect(contactInputSchema.safeParse({ ...valid, message: tooLong }).success).toBe(false);
    expect(contactInputSchema.safeParse({ ...valid, message: 'court' }).success).toBe(false);
  });
});
