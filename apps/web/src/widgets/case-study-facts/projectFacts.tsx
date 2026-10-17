import type { ProjectDetail } from '../../entities/project/index.ts';
import { ProjectStack } from '../../entities/project/index.ts';
import { projectLabels } from '../../shared/content/index.ts';
import type { Fact } from '../../shared/ui/index.ts';
import { ProjectLinks } from './ProjectLinks.tsx';

const { facts } = projectLabels;

/** The case study sheet; optional rows (period, links) are dropped when empty. */
export function projectFacts(project: ProjectDetail): Fact[] {
  const rows: (Fact | false)[] = [
    { term: facts.role, description: project.role },
    { term: facts.year, description: String(project.year) },
    project.duration !== undefined && { term: facts.duration, description: project.duration },
    { term: facts.origin, description: projectLabels.origins[project.origin] },
    { term: facts.stack, description: <ProjectStack technologies={project.technologies} /> },
    (project.liveUrl !== undefined || project.repoUrl !== undefined) && { term: facts.links, description: <ProjectLinks project={project} /> },
  ];
  return rows.filter((row) => row !== false);
}
