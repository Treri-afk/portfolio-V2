import type { ReactNode } from 'react';
import type { TextTone } from '../Text/index.ts';

export interface EyebrowProps {
  tone?: TextTone | undefined;
  className?: string | undefined;
  children: ReactNode;
}
