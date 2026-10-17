import type { TagItem } from '../../../shared/ui/index.ts';

export interface TechFilterProps {
  items: readonly TagItem[];
  selected: readonly string[];
  count: number;
  onChange: (selected: readonly string[]) => void;
}
