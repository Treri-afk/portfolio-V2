import clsx from 'clsx';
import styles from './Grid.module.css';
import type { GridProps } from './Grid.types.ts';

export function Grid({ as: Element = 'div', variant, className, children }: GridProps) {
  return (
    <Element className={clsx(styles.grid, className)} data-variant={variant}>
      {children}
    </Element>
  );
}
