export interface DynamicListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => string;
  horizontal?: boolean;
  flexWrap?: boolean;
  uniformSize?: boolean;
  staticMove?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export interface useDynamicListProps<T> {
  initialData: T[];
  horizontal?: boolean;
  flexWrap?: boolean;
  staticMove?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
}
