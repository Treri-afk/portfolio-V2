import type { LifecycleStep } from '@portfolio/contracts';
import { projectLabels } from '../../shared/content/index.ts';
import { Heading, Text } from '../../shared/ui/index.ts';
import styles from './CaseStudyLifecycle.module.css';

export function LifecycleSteps({ steps }: { steps: readonly LifecycleStep[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => (
        <li key={step.phase} className={styles.step}>
          <Heading level={3} size="heading-m">{projectLabels.phaseTitles[step.phase]}</Heading>
          <Text tone="secondary">{step.summary}</Text>
        </li>
      ))}
    </ol>
  );
}
