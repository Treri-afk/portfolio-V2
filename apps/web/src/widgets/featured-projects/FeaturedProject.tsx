import { ProjectCover, ProjectDecision, ProjectPhases, ProjectStack, projectKicker, projectPath, useProjectTransitionName, type ProjectCardData } from '../../entities/project/index.ts';
import { featured } from '../../shared/content/index.ts';
import { Eyebrow, Heading, Icon, Link, Stack, Text, VisuallyHidden } from '../../shared/ui/index.ts';
import styles from './FeaturedProjects.module.css';

/** One large square block: visual, the hard part and the key decision, the stages covered, the stack. */
export function FeaturedProject({ project, side }: { project: ProjectCardData; side: 'start' | 'end' }) {
  const transitionName = useProjectTransitionName(project.slug);
  return (
    <article className={styles.block} data-side={side} data-zoom-scope>
      <ProjectCover title={project.title} cover={project.cover} ratio="square" sizes="half" transitionName={transitionName} reveal />
      <Stack gap="lg" className={styles.body}>
        <Eyebrow>{projectKicker(project)}</Eyebrow>
        <Heading level={3} size="display-m">{project.title}</Heading>
        <Text variant="lead" tone="secondary">{project.tagline}</Text>
        {project.keyDecision ? <ProjectDecision decision={project.keyDecision} /> : null}
        <ProjectPhases covered={project.phases} />
        <ProjectStack technologies={project.technologies} />
        <Link to={projectPath(project.slug)} variant="standalone">
          {featured.readCase}<VisuallyHidden>{` : ${project.title}`}</VisuallyHidden><Icon name="arrow-right" />
        </Link>
      </Stack>
    </article>
  );
}
