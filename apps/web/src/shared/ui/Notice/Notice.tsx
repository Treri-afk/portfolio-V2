import styles from './Notice.module.css';
import type { NoticeProps } from './Notice.types.ts';

/** Status message box. Place it inside a live region that exists before the message (see ContactNotice). */
export function Notice({ tone, children }: NoticeProps) {
  return (
    <p className={styles.notice} data-tone={tone}>
      {children}
    </p>
  );
}
