import type { LegalDocument as LegalDocumentData } from '../../shared/api/legal/index.ts';
import { legalLabels } from '../../shared/content/index.ts';
import { LegalDocument } from '../../widgets/legal-document/index.ts';
import { PageIntro } from '../../widgets/page-intro/index.ts';

export function LegalPage({ document }: { document: LegalDocumentData }) {
  return (
    <>
      <PageIntro eyebrow={legalLabels.eyebrow} title={document.title} lead={document.description} angleBottom="fall-gentle" />
      <LegalDocument document={document} />
    </>
  );
}
