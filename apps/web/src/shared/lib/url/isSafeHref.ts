const SAFE = /^(https:|mailto:|\/(?!\/))/;

/** https, mailto, or a path on this site. Rejects protocol-relative URLs ("//host"), http:, javascript:… */
export function isSafeHref(href: string): boolean {
  return SAFE.test(href);
}
