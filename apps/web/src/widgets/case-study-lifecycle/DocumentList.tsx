import type { ProjectDocument } from '@portfolio/contracts';
import { projectLabels } from '../../shared/content/index.ts';
import { Eyebrow, Grid, Heading, Media, Stack, Text } from '../../shared/ui/index.ts';

/** Deliverables beyond code (market study, brand guidelines…), shown as captures. */
export function DocumentList({ documents }: { documents: readonly ProjectDocument[] }) {
  return (
    <Stack gap="lg">
      <Heading level={3} size="heading-l">{projectLabels.documentsTitle}</Heading>
      <Grid as="ul" variant="cards">
        {documents.map((document) => (
          <li key={document.src}>
            <Stack gap="sm">
              <Media src={document.src} alt={document.alt} width={document.width} height={document.height} ratio="landscape" sizes="third" focalY={0} reveal />
              <Eyebrow>{projectLabels.phaseTitles[document.phase]}</Eyebrow>
              <Heading level={4} size="heading-m">{document.title}</Heading>
              <Text variant="small" tone="secondary">{document.summary}</Text>
            </Stack>
          </li>
        ))}
      </Grid>
    </Stack>
  );
}
