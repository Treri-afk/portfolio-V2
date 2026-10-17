import clsx from 'clsx';
import styles from './SlantRule.module.css';

/** The only slanted stroke: a short accent rule, decorative and hidden from assistive tech. */
export function SlantRule({ className }: { className?: string | undefined }) {
  return <span aria-hidden="true" className={clsx(styles.rule, className)} />;
}
