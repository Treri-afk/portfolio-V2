import type { ProjectMedia } from '@portfolio/contracts';
import { Media } from '../../shared/ui/index.ts';
import styles from './CaseStudyBody.module.css';

interface ShotsProps {
  media: readonly ProjectMedia[];
  layout: 'landscape' | 'portrait';
}

export function Shots({ media, layout }: ShotsProps) {
  const isPortrait = layout === 'portrait';
  return (
    <ul className={styles.shots} data-layout={layout}>
      {media.map((item) => (
        <li key={item.src}>
          <Media src={item.src} alt={item.alt} width={item.width} height={item.height} ratio={isPortrait ? 'portrait' : undefined} sizes={isPortrait ? 'quarter' : 'half'} focalX={item.focalX} focalY={item.focalY} reveal />
        </li>
      ))}
    </ul>
  );
}
