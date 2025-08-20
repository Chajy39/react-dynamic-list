export type ListBasicProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => string;
  staticMove?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
  draggable?: boolean;
  // customTargetItem?: (item: T) => React.ReactNode;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  targetItemStyle?: React.CSSProperties;
};

export type useDynamicListProps<T> = {
  initialData: T[];
  horizontal?: boolean;
  flexWrap?: boolean;
  staticMove?: boolean;
  draggable: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
};
