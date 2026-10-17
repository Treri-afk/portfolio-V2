import type { Technology } from '@portfolio/contracts';
import { projectLabels } from '../../../../shared/content/index.ts';
import { technologyTags } from '../../../../shared/lib/tags/index.ts';
import { TagList } from '../../../../shared/ui/index.ts';

export function ProjectStack({ technologies }: { technologies: readonly Technology[] }) {
  return <TagList items={technologyTags(technologies)} label={projectLabels.facts.stack} />;
}
