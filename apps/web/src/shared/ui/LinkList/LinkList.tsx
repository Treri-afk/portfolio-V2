import { Icon, type IconName } from '../Icon/index.ts';
import { Link } from '../Link/index.ts';
import { Stack } from '../Stack/index.ts';

export interface LinkListItem {
  to: string;
  label: string;
  icon: IconName;
}

/** Row (or column) of action links with an icon: contact links, profiles. */
export function LinkList({ items, direction = 'row' }: { items: readonly LinkListItem[]; direction?: 'row' | 'column' }) {
  return (
    <Stack as="ul" direction={direction} gap={direction === 'row' ? 'lg' : 'sm'} wrap>
      {items.map((item) => (
        <li key={item.to}>
          <Link to={item.to} variant="standalone"><Icon name={item.icon} />{item.label}</Link>
        </li>
      ))}
    </Stack>
  );
}
