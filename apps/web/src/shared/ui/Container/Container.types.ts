import type { ReactNode } from 'react';

export type ContainerSize = 'text' | 'content' | 'wide';

export interface ContainerProps {
  size?: ContainerSize | undefined;
  className?: string | undefined;
  children: ReactNode;
}
