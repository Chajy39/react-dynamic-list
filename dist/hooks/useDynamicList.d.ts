import { MouseEvent } from 'react';
import { useDynamicListProps } from '../components/List/types';
export declare const useDynamicList: <T>({ initialData, onDragStart, onDragMove, onDragEnd, }: useDynamicListProps<T>) => {
    list: T[];
    listRef: import('react').RefObject<HTMLUListElement | null>;
    draggingItem: number | null;
    position: PositionType | null;
    itemDrag: (e: MouseEvent, index: number) => void;
    itemMove: (e: MouseEvent) => void;
    itemDrop: () => void;
};
