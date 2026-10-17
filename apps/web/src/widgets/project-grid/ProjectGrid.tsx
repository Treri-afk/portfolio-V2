import { ProjectCard } from '../../entities/project/index.ts';
import { TechFilter, filterProjects, useTechFilter } from '../../features/filter-projects/index.ts';
import { projectsPage } from '../../shared/content/index.ts';
import { technologyTags } from '../../shared/lib/tags/index.ts';
import { Container, Grid, Slice, Stack, Text } from '../../shared/ui/index.ts';
import type { ProjectGridProps } from './ProjectGrid.types.ts';

/** Filter + square grid. The visible list is derived from the URL on every render, never stored. */
export function ProjectGrid({ projects, technologies }: ProjectGridProps) {
  const { selected, setSelected } = useTechFilter();
  const visible = filterProjects(projects, selected);
  return (
    <Slice tone="sunken" angleTop="fall-gentle" angleBottom="rise-base">
      <Container size="wide">
        <Stack gap="xl">
          <TechFilter items={technologyTags(technologies)} selected={selected} count={visible.length} onChange={setSelected} />
          {visible.length === 0 ? <Text tone="secondary">{projectsPage.empty}</Text> : null}
          <Grid as="ul" variant="cards">
            {visible.map((project) => (
              <li key={project.slug}><ProjectCard project={project} headingLevel={2} /></li>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Slice>
  );
}
