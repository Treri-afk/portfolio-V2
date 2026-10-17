import type { ReactNode } from 'react';

export type GridVariant = 'cards' | 'split' | 'pillars';

export interface GridProps {
  as?: 'div' | 'ul' | 'ol' | undefined;
  variant: GridVariant;
  className?: string | undefined;
  children: ReactNode;
}
