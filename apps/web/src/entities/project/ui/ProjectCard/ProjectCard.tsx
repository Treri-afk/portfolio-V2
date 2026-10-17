import { Eyebrow, Heading, Link, Text } from '../../../../shared/ui/index.ts';
import { projectKicker } from '../../model/projectKicker.ts';
import { projectPath } from '../../model/projectPath.ts';
import { ProjectCover } from '../ProjectCover/index.ts';
import { ProjectStack } from '../ProjectStack/index.ts';
import { useProjectTransitionName } from '../useProjectTransitionName.ts';
import styles from './ProjectCard.module.css';
import type { ProjectCardProps } from './ProjectCard.types.ts';

/** Square card: the whole surface is clickable through the title link (one tab stop). */
export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const transitionName = useProjectTransitionName(project.slug);
  return (
    <article className={styles.card} data-zoom-scope>
      <ProjectCover title={project.title} cover={project.cover} ratio="square" sizes="third" transitionName={transitionName} reveal />
      <Eyebrow>{projectKicker(project)}</Eyebrow>
      <Heading level={headingLevel} size="heading-l">
        <Link to={projectPath(project.slug)} stretched className={styles.link}>{project.title}</Link>
      </Heading>
      <Text tone="secondary">{project.tagline}</Text>
      <ProjectStack technologies={project.technologies} />
    </article>
  );
}
