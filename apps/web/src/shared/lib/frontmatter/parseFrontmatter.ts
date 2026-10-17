import { parse } from 'yaml';

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

export interface Frontmatter {
  data: Record<string, unknown>;
  body: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/** Splits a Markdown document into its YAML front-matter (always an object) and its body. */
export function parseFrontmatter(source: string): Frontmatter {
  const match = FRONTMATTER.exec(source.replaceAll('\r\n', '\n'));
  if (!match) return { data: {}, body: source };
  const [, yaml = '', body = ''] = match;
  const data: unknown = parse(yaml);
  return { data: isRecord(data) ? data : {}, body };
}
