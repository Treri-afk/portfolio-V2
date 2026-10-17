import { ProjectCover, projectPath, useProjectTransitionName, type ProjectCardData } from '../../entities/project/index.ts';
import { projectLabels } from '../../shared/content/index.ts';
import { Container, Eyebrow, Grid, Heading, Link, Slice, Stack, Text } from '../../shared/ui/index.ts';
import styles from './NextProject.module.css';

/** The next project's visual morphs into its case study hero. */
export function NextProjectBlock({ project }: { project: ProjectCardData }) {
  const transitionName = useProjectTransitionName(project.slug);
  return (
    <Slice tone="sunken" angleTop="rise-gentle" angleBottom="rise-base">
      <Container size="wide" className={styles.frame}>
        <Grid variant="split">
          <Stack gap="md">
            <Eyebrow>{projectLabels.next}</Eyebrow>
            <Heading level={2} size="display-l"><Link to={projectPath(project.slug)} stretched>{project.title}</Link></Heading>
            <Text tone="secondary">{project.tagline}</Text>
          </Stack>
          <ProjectCover title={project.title} cover={project.cover} ratio="landscape" sizes="half" transitionName={transitionName} />
        </Grid>
      </Container>
    </Slice>
  );
}
