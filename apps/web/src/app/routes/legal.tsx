import { LegalPage } from '../../pages/legal/index.ts';
import { getLegalDocument } from '../../shared/api/legal/index.server.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/legal';

/** One module for every legal page: the slug is the path (/mentions-legales → mentions-legales.md). */
export function loader({ url }: Route.LoaderArgs) {
  return { document: getLegalDocument(url.pathname.replace(/^\/|\/$/g, '')) };
}

export const meta: Route.MetaFunction = ({ loaderData, location }) =>
  buildMeta({
    title: loaderData?.document.title ?? seo.pages.notFound.title,
    description: loaderData?.document.description ?? seo.pages.notFound.description,
    path: location.pathname,
  });

export default function Legal({ loaderData }: Route.ComponentProps) {
  return <LegalPage document={loaderData.document} />;
}
