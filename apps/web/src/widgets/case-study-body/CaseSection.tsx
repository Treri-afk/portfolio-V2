import type { ProjectSection } from '@portfolio/contracts';
import { projectLabels } from '../../shared/content/index.ts';
import { Heading, Prose } from '../../shared/ui/index.ts';
import styles from './CaseStudyBody.module.css';

export function CaseSection({ section }: { section: ProjectSection }) {
  const id = `section-${section.kind}`;
  return (
    <section className={styles.section} aria-labelledby={id}>
      <Heading level={2} size="heading-l" id={id} className={styles.title}>
        {projectLabels.sections[section.kind]}
      </Heading>
      <Prose markdown={section.bodyMd} />
    </section>
  );
}
