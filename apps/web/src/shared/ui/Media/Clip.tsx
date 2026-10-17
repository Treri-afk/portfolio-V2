import { playOnceVisible } from '../../lib/media/index.ts';
import { VisuallyHidden } from '../VisuallyHidden/index.ts';
import type { ClipProps } from './Clip.types.ts';
import styles from './Media.module.css';

/** Short silent animation, played once when it scrolls into view (WCAG 2.2.2: under 5 s, no loop). */
export function Clip({ src, poster, alt, width, height, priority }: ClipProps) {
  return (
    <>
      <video
        ref={playOnceVisible}
        className={styles.image}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        playsInline
        preload={priority ? 'auto' : 'none'}
        aria-hidden="true"
      />
      <VisuallyHidden>{alt}</VisuallyHidden>
    </>
  );
}
