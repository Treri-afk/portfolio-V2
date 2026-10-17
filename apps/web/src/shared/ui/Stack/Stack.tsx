import clsx from 'clsx';
import styles from './Stack.module.css';
import type { StackProps } from './Stack.types.ts';

export function Stack({ as: Element = 'div', direction = 'column', gap = 'md', align, wrap = false, className, children, ...aria }: StackProps) {
  return (
    <Element
      {...aria}
      className={clsx(styles.stack, className)}
      data-direction={direction}
      data-gap={gap}
      data-align={align}
      data-wrap={wrap || undefined}
    >
      {children}
    </Element>
  );
}
