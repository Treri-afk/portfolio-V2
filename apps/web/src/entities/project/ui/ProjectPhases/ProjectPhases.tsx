import type { ProjectPhase } from '@portfolio/contracts';
import { projectPhases } from '@portfolio/contracts/constants';
import { projectLabels } from '../../../../shared/content/index.ts';
import { Text, VisuallyHidden } from '../../../../shared/ui/index.ts';
import styles from './ProjectPhases.module.css';

/** The full cycle, market to operations; the stages this project covered are filled. */
export function ProjectPhases({ covered }: { covered: readonly ProjectPhase[] }) {
  return (
    <ol className={styles.list} aria-label={projectLabels.phasesLabel}>
      {projectPhases.map((phase) => {
        const isCovered = covered.includes(phase);
        return (
          <li key={phase} className={styles.phase} data-covered={isCovered || undefined}>
            <Text as="span" variant="eyebrow" tone={isCovered ? 'primary' : 'muted'}>{projectLabels.phases[phase]}</Text>
            <VisuallyHidden>{` : ${isCovered ? projectLabels.phaseCovered : projectLabels.phaseSkipped}`}</VisuallyHidden>
          </li>
        );
      })}
    </ol>
  );
}
