import { Heading } from '../Heading/index.ts';
import { Text } from '../Text/index.ts';
import clsx from 'clsx';
import { accentBarClass } from '../accent-bar/index.ts';
import styles from './NumberedList.module.css';
import type { NumberedListProps } from './NumberedList.types.ts';

/** Ordered steps with monospaced counters (01, 02…). */
export function NumberedList({ items, headingLevel = 3 }: NumberedListProps) {
  return (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.title} className={clsx(styles.item, accentBarClass)}>
          <Heading level={headingLevel} size="heading-m">
            {item.title}
          </Heading>
          <Text tone="secondary">{item.text}</Text>
        </li>
      ))}
    </ol>
  );
}
