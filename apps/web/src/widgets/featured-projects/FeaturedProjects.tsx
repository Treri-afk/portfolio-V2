import type { ProjectCardData } from '../../entities/project/index.ts';
import { featured } from '../../shared/content/index.ts';
import { Container, Icon, Link, SectionHeading, Slice, Stack } from '../../shared/ui/index.ts';
import { FeaturedProject } from './FeaturedProject.tsx';

const TITLE_ID = 'projets-phares';
const ALTERNATE_EVERY = 2;

export function FeaturedProjects({ projects }: { projects: readonly ProjectCardData[] }) {
  return (
    <Slice tone="sunken" angleTop="rise-steep" angleBottom="fall-base" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="2xl" align="start">
          <SectionHeading eyebrow={featured.eyebrow} title={featured.title} id={TITLE_ID} />
          {projects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} side={index % ALTERNATE_EVERY === 0 ? 'start' : 'end'} />
          ))}
          <Link to="/projets" variant="secondary">{featured.allProjects}<Icon name="arrow-right" /></Link>
        </Stack>
      </Container>
    </Slice>
  );
}
