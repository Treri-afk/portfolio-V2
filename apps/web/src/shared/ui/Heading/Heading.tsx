import { Text } from '../Text/index.ts';
import type { HeadingProps } from './Heading.types.ts';

/** Semantic level and visual size are independent: the outline stays correct whatever the design. */
export function Heading({ level, size, tone, id, className, children }: HeadingProps) {
  return (
    <Text as={`h${level}` as const} variant={size} tone={tone} id={id} className={className}>
      {children}
    </Text>
  );
}
