import { ProjectCover, coverOf, projectKicker, projectTransitionName, type ProjectDetail } from '../../entities/project/index.ts';
import { Container, Eyebrow, Heading, Slice, Stack, Text } from '../../shared/ui/index.ts';
import styles from './CaseStudyHero.module.css';

export function CaseStudyHero({ project }: { project: ProjectDetail }) {
  return (
    <Slice as="header" angleBottom="rise-base" elevated>
      <Container size="wide" className={styles.grid}>
        <Stack gap="lg">
          <Eyebrow>{projectKicker(project)}</Eyebrow>
          <Heading level={1} size="display-l">{project.title}</Heading>
          <Text variant="lead">{project.tagline}</Text>
          <Text tone="secondary">{project.summary}</Text>
        </Stack>
        <div className={styles.visual}>
          <ProjectCover title={project.title} cover={coverOf(project)} ratio="square" sizes="half" priority transitionName={projectTransitionName(project.slug)} />
        </div>
      </Container>
    </Slice>
  );
}
