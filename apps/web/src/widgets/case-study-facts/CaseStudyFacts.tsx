import { ProjectMetrics, type ProjectDetail } from '../../entities/project/index.ts';
import { projectLabels } from '../../shared/content/index.ts';
import { Container, Eyebrow, FactList, Slice, Stack } from '../../shared/ui/index.ts';
import styles from './CaseStudyFacts.module.css';
import { projectFacts } from './projectFacts.tsx';

export function CaseStudyFacts({ project }: { project: ProjectDetail }) {
  return (
    <Slice tone="sunken" angleTop="rise-base" angleBottom="fall-gentle">
      <Container size="wide" className={styles.grid}>
        <FactList facts={projectFacts(project)} />
        {project.metrics.length > 0 ? (
          <Stack gap="lg">
            <Eyebrow>{projectLabels.metricsTitle}</Eyebrow>
            <ProjectMetrics metrics={project.metrics} size="lg" withSource />
          </Stack>
        ) : null}
      </Container>
    </Slice>
  );
}
