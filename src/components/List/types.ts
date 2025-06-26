export interface DynamicListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => string;
  horizontal?: boolean;
  flexWrap?: boolean;
  uniformSize?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
}

export interface useDynamicListProps<T> {
  initialData: T[];
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
}
