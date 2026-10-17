import type { ProjectDecision } from '@portfolio/contracts';
import { projectLabels } from '../../../../shared/content/index.ts';
import { Icon, Link } from '../../../../shared/ui/index.ts';

export function CodeLink({ decision }: { decision: ProjectDecision }) {
  if (!decision.codeUrl) return null;
  return <Link to={decision.codeUrl} variant="file"><Icon name="github" />{decision.codeLabel ?? projectLabels.seeCode}</Link>;
}
