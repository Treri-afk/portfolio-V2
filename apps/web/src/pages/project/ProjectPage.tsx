import type { ProjectCardData, ProjectDetail } from '../../entities/project/index.ts';
import { CaseStudyBody } from '../../widgets/case-study-body/index.ts';
import { CaseStudyFacts } from '../../widgets/case-study-facts/index.ts';
import { CaseStudyHero } from '../../widgets/case-study-hero/index.ts';
import { CaseStudyLifecycle } from '../../widgets/case-study-lifecycle/index.ts';
import { NextProject } from '../../widgets/next-project/index.ts';

export function ProjectPage({ project, next }: { project: ProjectDetail; next: ProjectCardData | undefined }) {
  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyFacts project={project} />
      <CaseStudyLifecycle project={project} />
      <CaseStudyBody project={project} />
      <NextProject project={next} />
    </>
  );
}
