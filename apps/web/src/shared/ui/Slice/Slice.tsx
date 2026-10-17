import clsx from 'clsx';
import styles from './Slice.module.css';
import type { SliceProps } from './Slice.types.ts';

/** The only component that cuts the page with slanted edges. Adjacent slices share the angle of their common edge. */
export function Slice(props: SliceProps) {
  const { as: Element = 'section', tone = 'base', angleTop, angleBottom, elevated = false, labelledBy, className, children } = props;
  return (
    <Element
      aria-labelledby={labelledBy}
      className={clsx(styles.slice, className)}
      data-tone={tone}
      data-angle-top={angleTop}
      data-angle-bottom={angleBottom}
      data-elevated={elevated || undefined}
    >
      {children}
    </Element>
  );
}
