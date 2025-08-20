import { ListBasicProps } from '../../types/types';
export type ListFlexProps = {
    horizontal?: boolean;
    flexWrap?: boolean;
    uniformSize?: boolean;
};
export type DynamicListProps<T> = ListFlexProps & ListBasicProps<T>;
