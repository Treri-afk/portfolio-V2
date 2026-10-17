import type { ProjectDetail } from '../../entities/project/index.ts';
import { Container, Slice, Stack } from '../../shared/ui/index.ts';
import { CaseGallery } from './CaseGallery.tsx';
import { CaseSection } from './CaseSection.tsx';

export function CaseStudyBody({ project }: { project: ProjectDetail }) {
  const shots = project.media.filter((media) => !media.isCover);
  return (
    <Slice angleTop="fall-gentle" angleBottom="rise-gentle">
      <Container size="wide">
        <Stack gap="2xl">
          {project.sections.map((section) => <CaseSection key={section.kind} section={section} />)}
          {shots.length > 0 ? <CaseGallery media={shots} /> : null}
        </Stack>
      </Container>
    </Slice>
  );
}
