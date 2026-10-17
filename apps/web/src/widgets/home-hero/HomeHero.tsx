import { hero, site } from '../../shared/content/index.ts';
import { Container, Eyebrow, Heading, Icon, Link, Slice, Stack, Text } from '../../shared/ui/index.ts';
import { HeroVisual } from './HeroVisual.tsx';
import styles from './HomeHero.module.css';
import type { HomeHeroProps } from './HomeHero.types.ts';

/** Name, positioning, two actions; the first featured project's visual crosses the slanted cut. */
export function HomeHero({ visual }: HomeHeroProps) {
  return (
    <Slice as="header" angleBottom="rise-steep" elevated>
      <Container size="wide" className={styles.grid}>
        <Stack gap="lg" className={styles.copy}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <Heading level={1} size="display-xl">{site.name}</Heading>
          <Text variant="lead" tone="secondary" className={styles.lead}>{hero.lead}</Text>
          <Stack direction="row" gap="md" wrap>
            <Link to="/projets" variant="primary">{hero.primaryAction}<Icon name="arrow-right" /></Link>
            <Link to="/contact" variant="secondary">{hero.secondaryAction}</Link>
          </Stack>
        </Stack>
        {visual ? <HeroVisual visual={visual} /> : null}
      </Container>
    </Slice>
  );
}
