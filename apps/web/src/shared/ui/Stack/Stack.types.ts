import type { ReactNode } from 'react';

export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type StackAlign = 'start' | 'center';
export type StackElement = 'div' | 'ul' | 'ol' | 'section';

export interface StackProps {
  as?: StackElement | undefined;
  direction?: 'column' | 'row' | undefined;
  gap?: StackGap | undefined;
  align?: StackAlign | undefined;
  wrap?: boolean | undefined;
  'aria-label'?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}
