import type { ReactNode } from 'react';

export type LinkVariant = 'inline' | 'nav' | 'standalone' | 'file' | 'primary' | 'secondary';

export interface LinkProps {
  to: string;
  variant?: LinkVariant | undefined;
  /** The link's hit area covers its nearest positioned ancestor (cards). */
  stretched?: boolean | undefined;
  className?: string | undefined;
  children: ReactNode;
}
