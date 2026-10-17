import type { ReactNode } from 'react';

export interface Fact {
  term: string;
  description: ReactNode;
}

export interface FactListProps {
  facts: readonly Fact[];
}
