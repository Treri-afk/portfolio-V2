import type { ReactNode } from 'react';

export interface Fact {
  term: string;
  description: ReactNode;
}

/** sheet: stacked rows (case study facts). decision: term column beside the text (challenge / decision). */
export type FactListVariant = 'sheet' | 'decision';

export interface FactListProps {
  facts: readonly Fact[];
  variant?: FactListVariant | undefined;
}
