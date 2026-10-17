import { Container, Grid, Slice } from '../../shared/ui/index.ts';
import { CareerTimeline } from './CareerTimeline.tsx';
import { LookingFor } from './LookingFor.tsx';

/** Career on the left, what I am looking for on the right (sticky on wide screens). */
export function AboutProfile() {
  return (
    <Slice tone="sunken" angleTop="rise-gentle" angleBottom="fall-base">
      <Container size="wide">
        <Grid variant="split">
          <CareerTimeline />
          <LookingFor />
        </Grid>
      </Container>
    </Slice>
  );
}
