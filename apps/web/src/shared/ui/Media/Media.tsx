import clsx from 'clsx';
import styles from './Media.module.css';
import type { MediaProps } from './Media.types.ts';
import { mediaStyle } from './mediaStyle.ts';
import { Picture } from './Picture.tsx';

export function Media(props: MediaProps) {
  const { src, alt, width, height, ratio, focalX, focalY, sizes = 'full', priority = false, transitionName, reveal = false, className } = props;
  return (
    <div
      className={clsx(styles.frame, className)}
      data-ratio={ratio}
      data-reveal={reveal || undefined}
      style={mediaStyle(focalX, focalY, transitionName)}
    >
      <Picture src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} />
    </div>
  );
}
