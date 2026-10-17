import { NotFoundPage } from '../../pages/not-found/index.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/not-found';

export const meta: Route.MetaFunction = ({ location }) => [
  ...buildMeta({ ...seo.pages.notFound, path: location.pathname }),
  { name: 'robots', content: 'noindex' },
];

export default function NotFound() {
  return <NotFoundPage />;
}
