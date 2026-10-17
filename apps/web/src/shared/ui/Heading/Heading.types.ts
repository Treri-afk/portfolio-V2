import type { ReactNode } from 'react';
import type { TextTone, TextVariant } from '../Text/index.ts';

export type HeadingLevel = 1 | 2 | 3 | 4;

/** Levels a component may use below the page title: never a second h1. */
export type SubHeadingLevel = Exclude<HeadingLevel, 1>;

export type HeadingSize = Extract<TextVariant, `display-${string}` | `heading-${string}`>;

export interface HeadingProps {
  level: HeadingLevel;
  size: HeadingSize;
  tone?: TextTone | undefined;
  id?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}
