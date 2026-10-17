export interface TagItem {
  id: string;
  label: string;
}

export interface TagListProps {
  items: readonly TagItem[];
  label?: string | undefined;
}

export interface TagGroupProps {
  label: string;
  items: readonly TagItem[];
  selected: readonly string[];
  onChange: (selected: string[]) => void;
}
