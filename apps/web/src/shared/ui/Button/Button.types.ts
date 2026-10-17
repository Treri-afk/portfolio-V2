import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  variant?: ButtonVariant | undefined;
  type?: 'button' | 'submit' | undefined;
  isPending?: boolean;
  onPress?: () => void;
  'aria-label'?: string;
  className?: string | undefined;
  children: ReactNode;
}
