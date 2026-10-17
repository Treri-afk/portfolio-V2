import { NavLink } from 'react-router';
import { isExternalHref } from '../../lib/url/index.ts';
import type { LinkProps } from './Link.types.ts';
import { linkAttributes } from './linkAttributes.ts';

/** Internal links use a view transition; external links are https/mailto only and never leak the referrer. */
export function Link({ to, variant = 'inline', stretched = false, className, children }: LinkProps) {
  const attributes = linkAttributes(variant, stretched, className);
  if (isExternalHref(to)) {
    return <a href={to} rel="noopener noreferrer" {...attributes}>{children}</a>;
  }
  return <NavLink to={to} viewTransition prefetch="intent" {...attributes}>{children}</NavLink>;
}
