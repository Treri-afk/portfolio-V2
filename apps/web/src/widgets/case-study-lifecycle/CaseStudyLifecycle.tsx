import { ProjectPhases, type ProjectDetail } from '../../entities/project/index.ts';
import { projectLabels } from '../../shared/content/index.ts';
import { Container, SectionHeading, Slice, Stack } from '../../shared/ui/index.ts';
import { DocumentList } from './DocumentList.tsx';
import { LifecycleSteps } from './LifecycleSteps.tsx';

const TITLE_ID = 'cycle';

/** Both edges share the facts/body angle, so the page nests the same with or without this block. */
export function CaseStudyLifecycle({ project }: { project: ProjectDetail }) {
  if (project.lifecycle.length === 0) return null;
  return (
    <Slice tone="inverse" angleTop="fall-gentle" angleBottom="fall-gentle" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="xl">
          <SectionHeading eyebrow={projectLabels.lifecycleEyebrow} title={projectLabels.lifecycleTitle} id={TITLE_ID} />
          <ProjectPhases covered={project.lifecycle.map((step) => step.phase)} />
          <LifecycleSteps steps={project.lifecycle} />
          {project.documents.length > 0 ? <DocumentList documents={project.documents} /> : null}
        </Stack>
      </Container>
    </Slice>
  );
}
