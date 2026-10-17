import { afterEach, describe, expect, it, vi } from 'vitest';

const env = vi.hoisted((): { apiUrl: string | undefined } => ({ apiUrl: undefined }));
vi.mock('../../../shared/config/index.ts', () => ({ env }));

const { submitContact } = await import('./submitContact.ts');

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};
const valid = { name: 'Ada', email: 'ada@example.com', message: 'Bonjour, un poste à pourvoir.', website: '' };

afterEach(() => {
  vi.unstubAllGlobals();
  env.apiUrl = undefined;
});

describe('submitContact', () => {
  it('reports field errors without calling the API', async () => {
    env.apiUrl = 'https://api.example.fr';
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const result = await submitContact(form({ ...valid, email: 'ada' }));
    expect(result.status).toBe('invalid');
    expect(result.status === 'invalid' ? Object.keys(result.errors) : []).toEqual(['email']);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('never posts anywhere when no API URL is configured', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    expect(await submitContact(form(valid))).toEqual({ status: 'unavailable' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('succeeds when the API accepts the message (202)', async () => {
    env.apiUrl = 'https://api.example.fr';
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(null, { status: 202 }))));
    expect(await submitContact(form(valid))).toEqual({ status: 'success' });
  });

  it.each([
    ['a non-202 response', () => Promise.resolve(new Response(null, { status: 500 }))],
    ['a network failure', () => Promise.reject(new TypeError('offline'))],
  ])('reports the form unavailable on %s', async (_, response) => {
    env.apiUrl = 'https://api.example.fr';
    vi.stubGlobal('fetch', vi.fn(response));
    expect(await submitContact(form(valid))).toEqual({ status: 'unavailable' });
  });
});
