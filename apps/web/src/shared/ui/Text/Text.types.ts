import type { ReactNode } from 'react';

export type TextVariant =
  | 'display-xl'
  | 'display-l'
  | 'display-m'
  | 'heading-l'
  | 'heading-m'
  | 'lead'
  | 'body'
  | 'small'
  | 'mono'
  | 'eyebrow';

export type TextTone = 'primary' | 'secondary' | 'muted' | 'accent';

export type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'strong' | 'dt' | 'dd';

export interface TextProps {
  as?: TextElement | undefined;
  variant?: TextVariant | undefined;
  tone?: TextTone | undefined;
  id?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}
