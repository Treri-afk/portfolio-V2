import { describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.ts';
import { createRateLimiter } from '../src/lib/rateLimit.ts';
import type { SendMail } from '../src/services/contactMail.ts';

const ORIGIN = 'https://paulabraham.fr';
const valid = { name: 'Ada', email: 'ada@example.com', message: 'Bonjour, un projet à vous proposer.', website: '' };
const JSON_HEADERS = { 'content-type': 'application/json', origin: ORIGIN };

interface Options {
  send?: SendMail;
  clientLimit?: number;
  dailyLimit?: number;
  key?: string | null;
}

function setup({ send = vi.fn<SendMail>(() => Promise.resolve()), clientLimit = 5, dailyLimit = 50, key = 'client' }: Options = {}) {
  const app = createApp({
    allowedOrigin: ORIGIN,
    to: 'owner@example.com',
    send,
    clientLimiter: createRateLimiter(clientLimit, 60_000),
    dailyLimiter: createRateLimiter(dailyLimit, 60_000),
    clientKey: () => key,
  });
  const post = (body: unknown, headers: Record<string, string> = JSON_HEADERS) =>
    app.request('/v1/contact', { method: 'POST', headers, body: JSON.stringify(body) });
  return { app, send, post };
}

describe('POST /v1/contact', () => {
  it('mails a valid message and answers 202', async () => {
    const { send, post } = setup();
    const response = await post(valid);
    expect(response.status).toBe(202);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'owner@example.com', replyTo: 'ada@example.com' }));
    expect(response.headers.get('access-control-allow-origin')).toBe(ORIGIN);
  });

  it.each([
    ['an invalid email', { ...valid, email: 'nope' }],
    ['an unknown field', { ...valid, admin: true }],
    ['a short message', { ...valid, message: 'Salut' }],
  ])('rejects %s with 400 and sends nothing', async (_label, body) => {
    const { send, post } = setup();
    expect((await post(body)).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('answers a filled honeypot like a success, without sending', async () => {
    const { send, post } = setup();
    expect((await post({ ...valid, website: 'https://spam.example' })).status).toBe(202);
    expect(send).not.toHaveBeenCalled();
  });

  it('rejects a body that is not JSON', async () => {
    const { app } = setup();
    const response = await app.request('/v1/contact', { method: 'POST', headers: JSON_HEADERS, body: '{' });
    expect(response.status).toBe(400);
  });

  it('refuses another origin or a missing one with 403', async () => {
    const { send, post } = setup();
    expect((await post(valid, { 'content-type': 'application/json', origin: 'https://evil.example' })).status).toBe(403);
    expect((await post(valid, { 'content-type': 'application/json' })).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it('refuses a no-cors text/plain post or a missing type with 415', async () => {
    const { send, post } = setup();
    expect((await post(valid, { 'content-type': 'text/plain', origin: ORIGIN })).status).toBe(415);
    expect((await post(valid, { origin: ORIGIN })).status).toBe(415);
    expect(send).not.toHaveBeenCalled();
  });

  it('refuses an oversized body with 413', async () => {
    const { post } = setup();
    expect((await post({ ...valid, message: 'x'.repeat(40_000) })).status).toBe(413);
  });

  it('limits each client to its quota', async () => {
    const { post } = setup({ clientLimit: 2 });
    await post(valid);
    await post(valid);
    expect((await post(valid)).status).toBe(429);
  });

  it('caps the mails sent per day, whatever the client', async () => {
    const { send, post } = setup({ dailyLimit: 1 });
    await post(valid);
    expect((await post(valid)).status).toBe(429);
    expect(send).toHaveBeenCalledOnce();
  });

  it('answers 503 when the client cannot be identified (nginx misconfigured)', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { send, post } = setup({ key: null });
    expect((await post(valid)).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('answers 503 without leaking details when the mail fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { post } = setup({ send: vi.fn<SendMail>(() => Promise.reject(new Error('SMTP down'))) });
    const response = await post(valid);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'unavailable' });
    expect(error).not.toHaveBeenCalledWith(expect.anything(), expect.stringContaining('SMTP'));
    error.mockRestore();
  });

  it('does not allow another origin in the preflight', async () => {
    const { app } = setup();
    const response = await app.request('/v1/contact', { method: 'OPTIONS', headers: { origin: 'https://evil.example', 'access-control-request-method': 'POST' } });
    expect(response.headers.get('access-control-allow-origin')).not.toBe('https://evil.example');
  });
});
