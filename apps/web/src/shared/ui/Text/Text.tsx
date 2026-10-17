import clsx from 'clsx';
import styles from './Text.module.css';
import type { TextProps } from './Text.types.ts';

export function Text({ as: Element = 'p', variant = 'body', tone, id, className, children }: TextProps) {
  return (
    <Element id={id} className={clsx(styles.text, className)} data-variant={variant} data-tone={tone}>
      {children}
    </Element>
  );
}
