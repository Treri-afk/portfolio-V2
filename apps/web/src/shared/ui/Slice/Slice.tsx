import clsx from 'clsx';
import styles from './Slice.module.css';
import type { SliceProps } from './Slice.types.ts';
import { sliceAttributes } from './sliceAttributes.ts';

/** The only component that cuts the page with slanted edges. Adjacent slices share the angle of their common edge. */
export function Slice(props: SliceProps) {
  const { as: Element = 'section', labelledBy, className, children } = props;
  return (
    <Element aria-labelledby={labelledBy} className={clsx(styles.slice, className)} {...sliceAttributes(props)}>
      {children}
    </Element>
  );
}
