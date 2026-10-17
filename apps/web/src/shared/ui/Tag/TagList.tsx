import { Stack } from '../Stack/index.ts';
import styles from './Tag.module.css';
import type { TagListProps } from './Tag.types.ts';

/** Static list of tags (a project stack, for instance). */
export function TagList({ items, label }: TagListProps) {
  return (
    <Stack as="ul" direction="row" gap="sm" wrap aria-label={label}>
      {items.map((item) => (
        <li key={item.id} className={styles.tag}>
          {item.label}
        </li>
      ))}
    </Stack>
  );
}
