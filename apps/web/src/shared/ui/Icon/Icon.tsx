import styles from './Icon.module.css';
import { icons } from './icons.ts';
import type { IconProps } from './Icon.types.ts';

/** Decorative icon; the surrounding text carries the meaning. */
export function Icon({ name, size = 'sm' }: IconProps) {
  return (
    <svg className={styles.icon} data-size={size} data-icon={name} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icons[name]} />
    </svg>
  );
}
