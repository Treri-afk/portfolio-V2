import type { SubHeadingLevel } from '../Heading/index.ts';

export interface NumberedItem {
  title: string;
  text: string;
}

export interface NumberedListProps {
  items: readonly NumberedItem[];
  headingLevel?: SubHeadingLevel | undefined;
}
