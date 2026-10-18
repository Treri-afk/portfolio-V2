import type { SliceProps } from './Slice.types.ts';

/** A boolean data attribute: present (empty) when on, absent otherwise. */
const flag = (on: boolean | undefined) => (on === true ? '' : undefined);

/** Data attributes read by Slice.module.css; boolean flags are omitted when false. */
export function sliceAttributes({ tone = 'base', angleTop, angleBottom, compactTop, elevated }: SliceProps) {
  return {
    'data-tone': tone,
    'data-angle-top': angleTop,
    'data-angle-bottom': angleBottom,
    'data-compact-top': flag(compactTop),
    'data-elevated': flag(elevated),
  };
}
