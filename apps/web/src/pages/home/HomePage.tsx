import { ContactCta } from '../../widgets/contact-cta/index.ts';
import { ExpertisePillars } from '../../widgets/expertise-pillars/index.ts';
import { FeaturedProjects } from '../../widgets/featured-projects/index.ts';
import { HomeHero } from '../../widgets/home-hero/index.ts';
import { MethodSteps } from '../../widgets/method-steps/index.ts';
import type { HomePageProps } from './HomePage.types.ts';

export function HomePage({ heroVisual, featured, projects }: HomePageProps) {
  return (
    <>
      <HomeHero visual={heroVisual} />
      <FeaturedProjects projects={featured} />
      <ExpertisePillars projects={projects} />
      <MethodSteps />
      <ContactCta />
    </>
  );
}
