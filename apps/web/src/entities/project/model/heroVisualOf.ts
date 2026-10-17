import type { Project, ProjectMedia } from '@portfolio/contracts';

export interface HeroVisual {
  slug: string;
  title: string;
  media: ProjectMedia;
}

/** The home hero shows a second visual of the first featured project, so the cover is not repeated just below. */
export function heroVisualOf(project: Project | undefined): HeroVisual | null {
  const media = project?.media.find((item) => !item.isCover) ?? project?.media[0];
  return project && media ? { slug: project.slug, title: project.title, media } : null;
}
