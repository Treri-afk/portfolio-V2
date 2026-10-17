import { projectsPage } from '../../../shared/content/index.ts';
import { Button, Stack, TagGroup, Text } from '../../../shared/ui/index.ts';
import type { TechFilterProps } from './TechFilter.types.ts';

export function TechFilter({ items, selected, count, onChange }: TechFilterProps) {
  return (
    <Stack gap="md">
      <TagGroup label={projectsPage.filterLabel} items={items} selected={selected} onChange={onChange} />
      <Stack direction="row" gap="md" align="center" wrap>
        <Text as="p" variant="mono" tone="muted">
          <span aria-live="polite">{projectsPage.count(count)}</span>
        </Text>
        {selected.length > 0 ? (
          <Button variant="ghost" onPress={() => { onChange([]); }}>
            {projectsPage.reset}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
