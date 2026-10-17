import type { ProjectGridProps } from '../../widgets/project-grid/index.ts';
import { projectsPage } from '../../shared/content/index.ts';
import { PageIntro } from '../../widgets/page-intro/index.ts';
import { ProjectGrid } from '../../widgets/project-grid/index.ts';

export function ProjectsPage({ projects, technologies }: ProjectGridProps) {
  return (
    <>
      <PageIntro eyebrow={projectsPage.eyebrow} title={projectsPage.title} lead={projectsPage.lead} angleBottom="fall-gentle" />
      <ProjectGrid projects={projects} technologies={technologies} />
    </>
  );
}
