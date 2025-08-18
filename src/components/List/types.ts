export type ListGridProps = {
  type: "grid";
  cols?: number;
  // colsSubgrid?: boolean;
  rows?: number;
  // rowsSubgrid?: boolean;
};

export type ListFlexProps = {
  type: "flex";
  horizontal?: boolean;
  flexWrap?: boolean;
  uniformSize?: boolean;
};

export type ListBasicProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => string;
  staticMove?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
  // customTargetItem?: (item: T) => React.ReactNode;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  targetItemStyle?: React.CSSProperties;
};

export type DynamicListProps<T> =
  | (ListGridProps & ListBasicProps<T>)
  | (ListFlexProps & ListBasicProps<T>);

export type useDynamicListProps<T> = {
  initialData: T[];
  horizontal?: boolean;
  flexWrap?: boolean;
  staticMove?: boolean;
  onDragStart?: (list: T[], index: number) => void;
  onDragMove?: (list: T[], index: number) => void;
  onDragEnd?: (list: T[], index: number) => void;
};
