/** Raw Markdown case studies, bundled at build time (server-side loaders only). */
export function readProjectSources(): string[] {
  const files = import.meta.glob<string>('/src/shared/content/projects/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  });
  return Object.values(files);
}
