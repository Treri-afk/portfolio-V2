export interface NumberedItem {
  title: string;
  text: string;
}

export interface NumberedListProps {
  items: readonly NumberedItem[];
  headingLevel?: 3 | 4 | undefined;
}
