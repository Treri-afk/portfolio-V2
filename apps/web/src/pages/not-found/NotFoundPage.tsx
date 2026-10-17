import { notFound } from '../../shared/content/index.ts';
import { PageIntro } from '../../widgets/page-intro/index.ts';

export function NotFoundPage() {
  return <PageIntro eyebrow={notFound.eyebrow} title={notFound.title} lead={notFound.lead} angleBottom="rise-base" actions={notFound.actions} />;
}
