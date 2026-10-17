import type { MetaDescriptor } from 'react-router';

/** Open Graph and canonical tags need absolute URLs: emitted only when the site origin is known. */
export function absoluteTags(siteUrl: string | undefined, path: string, image: string | undefined): MetaDescriptor[] {
  if (siteUrl === undefined) return [];
  const url = new URL(path, siteUrl).href;
  const tags: MetaDescriptor[] = [
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:url', content: url },
  ];
  return image ? [...tags, { property: 'og:image', content: new URL(image, siteUrl).href }] : tags;
}
