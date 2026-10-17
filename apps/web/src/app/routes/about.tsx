import { groupByCategory } from '../../entities/technology/index.ts';
import { listTechnologies } from '../../entities/technology/index.server.ts';
import { AboutPage } from '../../pages/about/index.ts';
import { seo } from '../../shared/content/index.ts';
import { buildMeta, personJsonLd } from '../../shared/lib/seo/index.ts';
import type { Route } from './+types/about';

export function loader() {
  return { groups: groupByCategory(listTechnologies()) };
}

export const meta: Route.MetaFunction = ({ location }) => [...buildMeta({ ...seo.pages.about, path: location.pathname }), personJsonLd()];

export default function About({ loaderData }: Route.ComponentProps) {
  return <AboutPage groups={loaderData.groups} />;
}
