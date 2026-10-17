const IPV6_GROUPS = 8;
const PREFIX_GROUPS = 4;

/** An IPv6 network is a /64: the key covers it, so rotating addresses inside it does not reset the quota. */
export function ipv6Prefix(address: string): string {
  const [head = '', tail = ''] = address.toLowerCase().split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const zeros = address.includes('::') ? Array<string>(IPV6_GROUPS - left.length - right.length).fill('0') : [];
  const groups = [...left, ...zeros, ...right].slice(0, PREFIX_GROUPS);
  return `${groups.map((group) => group.replace(/^0+(?=.)/, '')).join(':')}::/64`;
}
