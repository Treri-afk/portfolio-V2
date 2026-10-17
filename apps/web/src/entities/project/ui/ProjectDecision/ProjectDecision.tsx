import type { ProjectDecision as Decision } from '@portfolio/contracts';
import { projectLabels } from '../../../../shared/content/index.ts';
import { Icon, Link, Text } from '../../../../shared/ui/index.ts';
import styles from './ProjectDecision.module.css';

/** The hard part and the key technical answer, with a link to the exact file when the code is public. */
export function ProjectDecision({ decision }: { decision: Decision }) {
  return (
    <dl className={styles.list}>
      <div className={styles.row}>
        <Text as="dt" variant="eyebrow" tone="accent" className={styles.term}>{projectLabels.challenge}</Text>
        <dd className={styles.text}>{decision.challenge}</dd>
      </div>
      <div className={styles.row}>
        <Text as="dt" variant="eyebrow" tone="accent" className={styles.term}>{projectLabels.decision}</Text>
        <dd className={styles.text}>
          {decision.decision}
          {decision.codeUrl ? (
            <Link to={decision.codeUrl} variant="file">
              <Icon name="github" />{decision.codeLabel ?? projectLabels.seeCode}
            </Link>
          ) : null}
        </dd>
      </div>
    </dl>
  );
}
