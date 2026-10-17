import type { ProjectCardData } from '../../entities/project/index.ts';
import type { HomeHeroProps } from '../../widgets/home-hero/index.ts';

export interface HomePageProps {
  heroVisual: HomeHeroProps['visual'];
  featured: readonly ProjectCardData[];
  projects: readonly ProjectCardData[];
}
