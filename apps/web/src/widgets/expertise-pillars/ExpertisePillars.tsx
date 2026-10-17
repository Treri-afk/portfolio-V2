import type { ProjectCardData } from '../../entities/project/index.ts';
import { pillars } from '../../shared/content/index.ts';
import { Container, Grid, SectionHeading, Slice, Stack } from '../../shared/ui/index.ts';
import { Pillar } from './Pillar.tsx';
import { resolveProofs } from './resolveProofs.ts';

const TITLE_ID = 'expertise';

export function ExpertisePillars({ projects }: { projects: readonly ProjectCardData[] }) {
  return (
    <Slice angleTop="fall-base" angleBottom="rise-gentle" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="2xl">
          <SectionHeading eyebrow={pillars.eyebrow} title={pillars.title} id={TITLE_ID} />
          <Grid as="ol" variant="pillars">
            {pillars.items.map((item) => (
              <Pillar key={item.title} title={item.title} text={item.text} proofs={resolveProofs(item.proofs, projects)} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Slice>
  );
}
