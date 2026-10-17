import clsx from 'clsx';
import { Label, Tag, TagGroup as AriaTagGroup, TagList as AriaTagList, type Selection } from 'react-aria-components';
import { Text } from '../Text/index.ts';
import styles from './Tag.module.css';
import type { TagGroupProps } from './Tag.types.ts';

const toIds = (selection: Selection, all: readonly { id: string }[]): string[] =>
  selection === 'all' ? all.map((item) => item.id) : [...selection].map(String);

/** Multi-select group of tags, keyboard accessible (React Aria). */
export function TagGroup({ label, items, selected, onChange }: TagGroupProps) {
  return (
    <AriaTagGroup selectionMode="multiple" selectedKeys={selected} onSelectionChange={(keys) => { onChange(toIds(keys, items)); }} className={clsx(styles.group)}>
      <Label><Text as="span" variant="eyebrow" tone="muted">{label}</Text></Label>
      <AriaTagList items={items} className={clsx(styles.list)}>
        {(item) => (
          <Tag id={item.id} className={clsx(styles.tag)} data-selectable>
            {item.label}
          </Tag>
        )}
      </AriaTagList>
    </AriaTagGroup>
  );
}
