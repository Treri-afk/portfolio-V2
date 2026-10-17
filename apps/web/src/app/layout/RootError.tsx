import { isRouteErrorResponse } from 'react-router';
import { NotFoundPage } from '../../pages/not-found/index.ts';
import { ui } from '../../shared/content/index.ts';
import { NOT_FOUND_STATUS } from '../../shared/lib/http/index.ts';
import { PageIntro } from '../../widgets/page-intro/index.ts';

export function RootError({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error) && error.status === NOT_FOUND_STATUS) return <NotFoundPage />;
  return <PageIntro eyebrow={ui.error.eyebrow} title={ui.error.title} lead={ui.error.lead} angleBottom="rise-base" />;
}
