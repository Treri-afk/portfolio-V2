import { Text } from '../Text/index.ts';
import styles from './FactList.module.css';
import type { FactListProps } from './FactList.types.ts';

/** Key/value sheet: role, year, stack, links. */
export function FactList({ facts }: FactListProps) {
  return (
    <dl className={styles.list}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.row}>
          <Text as="dt" variant="eyebrow" tone="muted">{fact.term}</Text>
          <dd className={styles.description}>{fact.description}</dd>
        </div>
      ))}
    </dl>
  );
}
