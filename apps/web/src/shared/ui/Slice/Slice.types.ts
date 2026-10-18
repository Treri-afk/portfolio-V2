import type { ReactNode } from 'react';

/** Signed slice angles: "fall" goes down to the right, "rise" goes up to the right. */
export type SliceAngle = `${'fall' | 'rise'}-${'gentle' | 'base' | 'steep'}`;

export type SliceTone = 'base' | 'sunken' | 'inverse';

export interface SliceProps {
  as?: 'section' | 'div' | 'header' | 'footer' | 'article' | undefined;
  tone?: SliceTone | undefined;
  angleTop?: SliceAngle | undefined;
  angleBottom?: SliceAngle | undefined;
  /** Smaller top padding: the first slice of a page, right under the site header. */
  compactTop?: boolean | undefined;
  /** Lets content (a visual) overflow onto the next slice. */
  elevated?: boolean | undefined;
  labelledBy?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}
