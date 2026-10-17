import { notFound } from '../../lib/http/index.ts';
import { parseFrontmatter } from '../../lib/frontmatter/index.ts';
import { legalDocumentSchema, type LegalDocument } from './legalDocument.ts';

const sources = import.meta.glob<string>('/src/shared/content/legal/*.md', { query: '?raw', import: 'default', eager: true });

/** Legal page by slug (file name), validated at build time. */
export function getLegalDocument(slug: string): LegalDocument {
  const source = sources[`/src/shared/content/legal/${slug}.md`];
  if (source === undefined) throw notFound();
  const { data, body } = parseFrontmatter(source);
  return legalDocumentSchema.parse({ ...data, slug, bodyMd: body.trim() });
}
