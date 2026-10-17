import { Eyebrow } from '../Eyebrow/index.ts';
import { Heading } from '../Heading/index.ts';
import { Stack } from '../Stack/index.ts';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
}

/** Kicker + section title (h2). The id labels the surrounding section. */
export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  return (
    <Stack gap="md">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} size="display-m" id={id}>{title}</Heading>
    </Stack>
  );
}
