import type { MetaDescriptor } from 'react-router';
import { env } from '../../config/index.ts';
import { seo } from '../../content/index.ts';
import { absoluteTags } from './absoluteTags.ts';

export interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: string | undefined;
  isRoot?: boolean | undefined;
}

/** Title, description, Open Graph; canonical and absolute image URLs once the site origin is configured. */
export function buildMeta({ title, description, path, image, isRoot = false }: MetaInput): MetaDescriptor[] {
  const fullTitle = isRoot ? title : `${title}${seo.titleSuffix}`;
  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    ...absoluteTags(env.siteUrl, path, image),
  ];
}
