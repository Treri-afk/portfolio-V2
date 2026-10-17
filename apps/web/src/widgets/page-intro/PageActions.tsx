import { Icon, Link, Stack } from '../../shared/ui/index.ts';
import type { PageIntroAction } from './PageIntro.types.ts';

export function PageActions({ actions }: { actions: readonly PageIntroAction[] }) {
  if (actions.length === 0) return null;
  return (
    <Stack direction="row" gap="md" wrap>
      {actions.map((action) => (
        <Link key={action.to} to={action.to} variant={action.variant}>
          {action.label}
          {action.variant === 'primary' ? <Icon name="arrow-right" /> : null}
        </Link>
      ))}
    </Stack>
  );
}
