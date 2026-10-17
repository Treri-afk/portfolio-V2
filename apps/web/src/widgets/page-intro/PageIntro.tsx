import { Container, Eyebrow, Heading, Stack, Slice, Text } from '../../shared/ui/index.ts';
import { PageActions } from './PageActions.tsx';
import styles from './PageIntro.module.css';
import type { PageIntroProps } from './PageIntro.types.ts';

/** Opening block of an inner page: kicker, the page h1, a lead, optional actions. */
export function PageIntro({ eyebrow, title, lead, angleBottom, actions = [] }: PageIntroProps) {
  return (
    <Slice as="header" angleBottom={angleBottom}>
      <Container>
        <Stack gap="lg">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading level={1} size="display-l">{title}</Heading>
          <Text variant="lead" tone="secondary" className={styles.lead}>{lead}</Text>
          <PageActions actions={actions} />
        </Stack>
      </Container>
    </Slice>
  );
}
