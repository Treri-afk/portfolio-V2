import type { TechnologyGroup } from '../../entities/technology/index.ts';
import { about } from '../../shared/content/index.ts';
import { technologyTags } from '../../shared/lib/tags/index.ts';
import { Container, Eyebrow, Grid, Heading, Slice, Stack, TagList, Text } from '../../shared/ui/index.ts';

const TITLE_ID = 'outils';

export function Toolbox({ groups }: { groups: readonly TechnologyGroup[] }) {
  return (
    <Slice angleTop="fall-base" angleBottom="rise-base" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="xl">
          <Heading level={2} size="display-m" id={TITLE_ID}>{about.toolboxTitle}</Heading>
          <Text tone="secondary">{about.toolboxLead}</Text>
          <Grid variant="cards">
            {groups.map((group) => (
              <Stack key={group.category} gap="md">
                <Eyebrow>{about.categories[group.category]}</Eyebrow>
                <TagList items={technologyTags(group.technologies)} />
              </Stack>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Slice>
  );
}
