import { describe, expect, it } from 'vitest';
import { contactMail } from '../src/services/contactMail.ts';

describe('contactMail', () => {
  it('keeps header values on one line', () => {
    const mail = contactMail({ name: 'Ada\r\nBcc: x@evil.example', email: 'ada@example.com', message: 'Bonjour à vous.', website: '' }, 'o@example.com');
    expect(mail.subject).toBe('Portfolio : message de Ada Bcc: x@evil.example');
    expect(mail.replyTo).toBe('ada@example.com');
  });
});
