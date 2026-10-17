import { method } from '../../shared/content/index.ts';
import { Container, NumberedList, SectionHeading, Slice, Stack } from '../../shared/ui/index.ts';

const TITLE_ID = 'methode';

export function MethodSteps() {
  return (
    <Slice tone="inverse" angleTop="rise-gentle" angleBottom="fall-steep" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="2xl">
          <SectionHeading eyebrow={method.eyebrow} title={method.title} id={TITLE_ID} />
          <NumberedList items={method.steps} />
        </Stack>
      </Container>
    </Slice>
  );
}
