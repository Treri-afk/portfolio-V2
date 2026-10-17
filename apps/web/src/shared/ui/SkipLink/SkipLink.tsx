import styles from './SkipLink.module.css';

export function SkipLink({ target, label }: { target: string; label: string }) {
  return (
    <a href={`#${target}`} className={styles.skip}>
      {label}
    </a>
  );
}
