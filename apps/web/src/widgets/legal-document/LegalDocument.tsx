import type { LegalDocument as LegalDocumentData } from '../../shared/api/legal/index.ts';
import { legalLabels } from '../../shared/content/index.ts';
import { formatDate } from '../../shared/lib/date/index.ts';
import { Container, Prose, Slice, Stack, Text } from '../../shared/ui/index.ts';
import styles from './LegalDocument.module.css';

export function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    <Slice tone="sunken" angleTop="fall-gentle" angleBottom="rise-base">
      <Container size="text">
        <Stack gap="lg" className={styles.document}>
          <Text variant="mono" tone="muted">{`${legalLabels.updated} ${formatDate(document.updated)}`}</Text>
          <Prose markdown={document.bodyMd} />
        </Stack>
      </Container>
    </Slice>
  );
}
