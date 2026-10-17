import type { TechnologyGroup } from '../../entities/technology/index.ts';
import { about } from '../../shared/content/index.ts';
import { AboutProfile } from '../../widgets/about-profile/index.ts';
import { PageIntro } from '../../widgets/page-intro/index.ts';
import { Toolbox } from '../../widgets/toolbox/index.ts';

export function AboutPage({ groups }: { groups: readonly TechnologyGroup[] }) {
  return (
    <>
      <PageIntro eyebrow={about.eyebrow} title={about.title} lead={about.lead} angleBottom="rise-gentle" />
      <AboutProfile />
      <Toolbox groups={groups} />
    </>
  );
}
