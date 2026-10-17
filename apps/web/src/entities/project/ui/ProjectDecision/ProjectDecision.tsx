import type { ProjectDecision as Decision } from '@portfolio/contracts';
import { projectLabels } from '../../../../shared/content/index.ts';
import { FactList } from '../../../../shared/ui/index.ts';
import { CodeLink } from './CodeLink.tsx';

/** The hard part and the key technical answer, with a link to the exact file when the code is public. */
export function ProjectDecision({ decision }: { decision: Decision }) {
  const facts = [
    { term: projectLabels.challenge, description: decision.challenge },
    { term: projectLabels.decision, description: <>{decision.decision}<CodeLink decision={decision} /></> },
  ];
  return <FactList variant="decision" facts={facts} />;
}
