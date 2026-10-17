import { mediaSizes } from '@portfolio/tokens/media';
import { srcSet } from '../../lib/media/index.ts';
import styles from './Media.module.css';
import type { PictureProps } from './Picture.types.ts';

/** AVIF, then WebP, then the original as a fallback; the browser picks the width it needs. */
export function Picture({ src, alt, width, height, sizes, priority }: PictureProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(src, width, 'avif')} sizes={mediaSizes[sizes]} />
      <source type="image/webp" srcSet={srcSet(src, width, 'webp')} sizes={mediaSizes[sizes]} />
      <img
        className={styles.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}
