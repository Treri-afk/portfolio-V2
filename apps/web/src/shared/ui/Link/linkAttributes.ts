import clsx from 'clsx';
import actionStyles from '../action/action.module.css';
import styles from './Link.module.css';
import type { LinkVariant } from './Link.types.ts';

const ACTIONS = new Set<LinkVariant>(['primary', 'secondary']);

/** Class and data attributes shared by internal and external links. */
export function linkAttributes(variant: LinkVariant, stretched: boolean, className: string | undefined) {
  return {
    className: clsx(ACTIONS.has(variant) ? actionStyles.action : styles.link, className),
    'data-variant': variant,
    'data-stretched': stretched || undefined,
  };
}
