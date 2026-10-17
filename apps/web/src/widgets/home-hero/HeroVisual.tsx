import { projectPath, type HeroVisual as HeroVisualData } from '../../entities/project/index.ts';
import { hero } from '../../shared/content/index.ts';
import { Icon, Link, Media } from '../../shared/ui/index.ts';
import styles from './HomeHero.module.css';

/** First featured project's visual, hanging over the slanted cut into the next block. */
export function HeroVisual({ visual }: { visual: HeroVisualData }) {
  return (
    <figure className={styles.visual}>
      <Media {...visual.media} ratio="square" sizes="half" priority />
      <figcaption>
        <Link to={projectPath(visual.slug)} variant="standalone">{`${visual.title} — ${hero.visualCaption}`}<Icon name="arrow-right" /></Link>
      </figcaption>
    </figure>
  );
}
