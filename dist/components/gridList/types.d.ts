import { ListBasicProps } from '../../types/types';
export type ListGridProps = {
    cols?: number;
    rows?: number;
};
export type GridListProps<T> = ListGridProps & ListBasicProps<T>;
