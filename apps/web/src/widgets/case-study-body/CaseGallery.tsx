import type { ProjectMedia } from '@portfolio/contracts';
import { projectLabels } from '../../shared/content/index.ts';
import { Heading } from '../../shared/ui/index.ts';
import { byOrientation } from './byOrientation.ts';
import styles from './CaseStudyBody.module.css';
import { Shots } from './Shots.tsx';

export function CaseGallery({ media }: { media: readonly ProjectMedia[] }) {
  const { portrait, landscape } = byOrientation(media);
  return (
    <section className={styles.gallery} aria-labelledby="section-gallery">
      <Heading level={2} size="heading-l" id="section-gallery">{projectLabels.gallery}</Heading>
      {landscape.length > 0 ? <Shots media={landscape} layout="landscape" /> : null}
      {portrait.length > 0 ? <Shots media={portrait} layout="portrait" /> : null}
    </section>
  );
}
