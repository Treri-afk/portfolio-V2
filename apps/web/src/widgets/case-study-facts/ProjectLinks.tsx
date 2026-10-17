import type { ProjectDetail } from '../../entities/project/index.ts';
import { projectLabels } from '../../shared/content/index.ts';
import { Icon, Link, Stack } from '../../shared/ui/index.ts';

export function ProjectLinks({ project }: { project: Pick<ProjectDetail, 'liveUrl' | 'repoUrl'> }) {
  return (
    <Stack direction="row" gap="lg" wrap>
      {project.liveUrl ? <Link to={project.liveUrl} variant="standalone">{projectLabels.live}<Icon name="arrow-up-right" /></Link> : null}
      {project.repoUrl ? <Link to={project.repoUrl} variant="standalone">{projectLabels.repo}<Icon name="github" /></Link> : null}
    </Stack>
  );
}
