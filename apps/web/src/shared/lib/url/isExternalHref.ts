const EXTERNAL = /^(https:|mailto:)/;

/** True for links that leave the site (only https and mailto are allowed). */
export function isExternalHref(href: string): boolean {
  return EXTERNAL.test(href);
}
