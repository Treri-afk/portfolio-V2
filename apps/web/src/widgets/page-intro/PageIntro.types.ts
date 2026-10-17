import type { SliceAngle } from '../../shared/ui/index.ts';

export interface PageIntroAction {
  to: string;
  label: string;
  variant: 'primary' | 'secondary';
}

export interface PageIntroProps {
  eyebrow: string;
  title: string;
  lead: string;
  angleBottom?: SliceAngle | undefined;
  actions?: readonly PageIntroAction[] | undefined;
}
