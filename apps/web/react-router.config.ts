import { readdirSync } from 'node:fs';
import type { Config } from '@react-router/dev/config';
import { legalLinks } from './src/shared/content/index.ts';

const PROJECTS_DIR = new URL('./src/shared/content/projects/', import.meta.url);

const markdownSlugs = (dir: URL): string[] =>
  readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));

export default {
  appDirectory: 'src/app',
  ssr: false,
  prerender: () => [
    '/',
    '/projets',
    '/a-propos',
    '/contact',
    ...markdownSlugs(PROJECTS_DIR).map((slug) => `/projets/${slug}`),
    ...legalLinks.map((link) => link.to),
  ],
} satisfies Config;
