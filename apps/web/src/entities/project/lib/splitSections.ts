import { sectionKinds } from '@portfolio/contracts/constants';

/** split() with a capture group alternates heading names and bodies. */
const PAIR = 2;

const HEADING = new RegExp(`^## (${sectionKinds.join('|')})\\s*$`, 'm');

export interface RawSection {
  kind: string;
  bodyMd: string;
}

/** Splits a case study body on "## <kind>" headings (context, problem, role…). */
export function splitSections(body: string): RawSection[] {
  const parts = body.split(HEADING).slice(1);
  const sections: RawSection[] = [];
  for (let index = 0; index < parts.length; index += PAIR) {
    sections.push({ kind: parts[index] ?? '', bodyMd: (parts[index + 1] ?? '').trim() });
  }
  return sections;
}
