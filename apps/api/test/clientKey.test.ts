import { Hono } from 'hono';
import { describe, expect, it } from 'vitest';
import { clientKey } from '../src/lib/clientKey.ts';
import { ipv6Prefix } from '../src/lib/ipPrefix.ts';

const app = new Hono().get('/', (c) => c.text(clientKey(c) ?? 'null'));
const keyFor = async (value?: string) => (await app.request('/', value === undefined ? {} : { headers: { 'x-real-ip': value } })).text();

describe('ipv6Prefix', () => {
  it.each([
    ['2001:db8:1:2:3:4:5:6', '2001:db8:1:2::/64'],
    ['2001:DB8::1', '2001:db8:0:0::/64'],
    ['2001:db8:0001:0002::ffff', '2001:db8:1:2::/64'],
  ])('%s → %s', (address, prefix) => {
    expect(ipv6Prefix(address)).toBe(prefix);
  });
});

describe('clientKey', () => {
  it('hashes the address: same client, same key, never the raw IP', async () => {
    const key = await keyFor('203.0.113.7');
    expect(key).toBe(await keyFor('203.0.113.7'));
    expect(key).not.toContain('203');
    expect(key).not.toBe(await keyFor('203.0.113.8'));
  });

  it('reads an IPv4-mapped address as the IPv4 itself', async () => {
    expect(await keyFor('::ffff:203.0.113.7')).toBe(await keyFor('203.0.113.7'));
    expect(await keyFor('::ffff:203.0.113.7')).not.toBe(await keyFor('::ffff:198.51.100.1'));
  });

  it('groups an IPv6 /64', async () => {
    expect(await keyFor('2001:db8:1:2::a')).toBe(await keyFor('2001:db8:1:2::b'));
  });

  it.each([undefined, '', 'unknown', '999.1.1.1'])('returns null for %s', async (value) => {
    expect(await keyFor(value)).toBe('null');
  });
});
