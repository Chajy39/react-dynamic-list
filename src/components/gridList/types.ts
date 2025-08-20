import { ListBasicProps } from "../../types/types";

export type ListGridProps = {
  cols?: number;
  // colsSubgrid?: boolean;
  rows?: number;
  // rowsSubgrid?: boolean;
};

export type GridListProps<T> = ListGridProps & ListBasicProps<T>;
