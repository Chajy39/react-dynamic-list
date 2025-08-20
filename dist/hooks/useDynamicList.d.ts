import { MouseEvent } from 'react';
import { useDynamicListProps } from '../components/List/types';
type PositionType = {
    x: number;
    y: number;
};
export declare const useDynamicList: <T>({ initialData, horizontal, flexWrap, staticMove, onDragStart, onDragMove, onDragEnd, }: useDynamicListProps<T>) => {
    list: T[];
    listRef: import('react').RefObject<HTMLUListElement | null>;
    draggingItem: number | null;
    draggingItemData: T | null;
    position: PositionType | null;
    dragItemSize: {
        width: number;
        height: number;
    };
    dropTargetIndex: number | null;
    itemDrag: (e: MouseEvent, index: number) => void;
    itemMove: (e: any) => void;
    itemDrop: () => void;
};
export {};
