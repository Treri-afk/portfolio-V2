import clsx from 'clsx';
import { NavLink } from 'react-router';
import { isExternalHref } from '../../lib/url/index.ts';
import actionStyles from '../action/action.module.css';
import styles from './Link.module.css';
import type { LinkProps } from './Link.types.ts';

const ACTIONS = new Set(['primary', 'secondary']);

/** Internal links use a view transition; external links are https/mailto only and never leak the referrer. */
export function Link({ to, variant = 'inline', stretched = false, className, children }: LinkProps) {
  const classes = clsx(ACTIONS.has(variant) ? actionStyles.action : styles.link, className);
  if (isExternalHref(to)) {
    return (
      <a href={to} rel="noopener noreferrer" className={classes} data-variant={variant} data-stretched={stretched || undefined}>
        {children}
      </a>
    );
  }
  return (
    <NavLink to={to} viewTransition prefetch="intent" className={classes} data-variant={variant} data-stretched={stretched || undefined}>
      {children}
    </NavLink>
  );
}
