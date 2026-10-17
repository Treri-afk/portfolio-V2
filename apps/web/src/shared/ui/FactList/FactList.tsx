import { Text } from '../Text/index.ts';
import styles from './FactList.module.css';
import type { FactListProps } from './FactList.types.ts';

/** Key/value list: a project sheet (role, year, links) or a challenge/decision pair. */
export function FactList({ facts, variant = 'sheet' }: FactListProps) {
  const tone = variant === 'decision' ? 'accent' : 'muted';
  return (
    <dl className={styles.list} data-variant={variant}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.row}>
          <Text as="dt" variant="eyebrow" tone={tone} className={styles.term}>{fact.term}</Text>
          <dd className={styles.description}>{fact.description}</dd>
        </div>
      ))}
    </dl>
  );
}
