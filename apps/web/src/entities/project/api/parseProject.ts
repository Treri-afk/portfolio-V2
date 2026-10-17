import { projectSchema, type Project } from '@portfolio/contracts';
import { parseFrontmatter } from '../../../shared/lib/frontmatter/index.ts';
import { splitSections } from '../lib/splitSections.ts';

/** Markdown + front-matter → validated Project. Invalid content fails the build, never the visitor. */
export function parseProject(source: string): Project {
  const { data, body } = parseFrontmatter(source);
  return projectSchema.parse({ ...data, sections: splitSections(body) });
}
