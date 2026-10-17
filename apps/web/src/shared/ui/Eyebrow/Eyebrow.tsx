import { Text } from '../Text/index.ts';
import type { EyebrowProps } from './Eyebrow.types.ts';

/** Monospaced kicker above a title: category, year, stack. */
export function Eyebrow({ tone = 'muted', className, children }: EyebrowProps) {
  return (
    <Text variant="eyebrow" tone={tone} className={className}>
      {children}
    </Text>
  );
}
