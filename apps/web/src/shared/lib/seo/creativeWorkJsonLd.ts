import type { MetaDescriptor } from 'react-router';
import { site } from '../../content/index.ts';

export interface CreativeWorkInput {
  name: string;
  description: string;
  year: number;
  url?: string | undefined;
}

/** JSON-LD CreativeWork for a case study. */
export function creativeWorkJsonLd({ name, description, year, url }: CreativeWorkInput): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name,
      description,
      dateCreated: String(year),
      creator: { '@type': 'Person', name: site.name },
      ...(url ? { url } : {}),
    },
  };
}
