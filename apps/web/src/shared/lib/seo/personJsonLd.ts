import type { MetaDescriptor } from 'react-router';
import { site } from '../../content/index.ts';

/** JSON-LD Person, rendered safely by React Router's <Meta />. */
export function personJsonLd(): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      sameAs: [site.githubUrl],
    },
  };
}
