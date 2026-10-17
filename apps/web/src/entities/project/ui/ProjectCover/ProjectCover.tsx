import { Media, SlantRule } from '../../../../shared/ui/index.ts';
import styles from './ProjectCover.module.css';
import type { ProjectCoverProps } from './ProjectCover.types.ts';
import { coverStyle } from './coverStyle.ts';

/** Project visual, or a typographic cover when no capture can be shown yet. */
export function ProjectCover({ title, cover, ratio, sizes, priority, transitionName, reveal }: ProjectCoverProps) {
  if (!cover) {
    return (
      <div className={styles.fallback} data-ratio={ratio} style={coverStyle(transitionName)} aria-hidden="true">
        <SlantRule className={styles.rule} />
        <span className={styles.title}>{title}</span>
      </div>
    );
  }
  const { src, alt, width, height, focalX, focalY } = cover;
  const media = { src, alt, width, height, focalX, focalY, ratio, sizes, priority, transitionName, reveal };
  return <Media {...media} />;
}
