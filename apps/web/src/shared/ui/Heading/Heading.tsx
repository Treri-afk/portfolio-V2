import { Text, type TextElement } from '../Text/index.ts';
import type { HeadingLevel, HeadingProps } from './Heading.types.ts';

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const satisfies Record<HeadingLevel, TextElement>;

/** Semantic level and visual size are independent: the outline stays correct whatever the design. */
export function Heading({ level, size, tone, id, className, children }: HeadingProps) {
  return (
    <Text as={TAGS[level]} variant={size} tone={tone} id={id} className={className}>
      {children}
    </Text>
  );
}
