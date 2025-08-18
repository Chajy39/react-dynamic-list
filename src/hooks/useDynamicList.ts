import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDynamicListProps } from "../components/List/types";

type PositionType = { x: number; y: number };

const findClosestIndex = <T>({
  position,
  rects,
  horizontal,
  flexWrap,
}: {
  position: PositionType;
  rects: DOMRect[];
  horizontal?: boolean;
  flexWrap?: boolean;
}): number => {
  if (rects.length === 0) return -1;

  let closestIndex = -1;
  let minDistance = Infinity;

  const gridRect = rects.reduce(
    (acc, rect) => {
      acc.top = Math.min(acc.top, rect.top);
      acc.left = Math.min(acc.left, rect.left);
      acc.right = Math.max(acc.right, rect.right);
      acc.bottom = Math.max(acc.bottom, rect.bottom);
      return acc;
    },
    {
      top: Infinity,
      left: Infinity,
      right: -Infinity,
      bottom: -Infinity,
    }
  );

  rects.forEach((rect, index) => {
    let distance: number;

    if (flexWrap) {
      if (
        position.x >= gridRect.left &&
        position.x <= gridRect.right &&
        position.y >= gridRect.top &&
        position.y <= gridRect.bottom
      ) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        distance = Math.sqrt(
          Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)
        );
      } else {
        const dx = Math.max(rect.left - position.x, 0, position.x - rect.right);
        const dy = Math.max(rect.top - position.y, 0, position.y - rect.bottom);
        distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      }
    } else {
      const center = horizontal
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
      distance = horizontal
        ? Math.abs(position.x - center)
        : Math.abs(position.y - center);
    }

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

export const useDynamicList = <T>({
  initialData,
  horizontal,
  flexWrap,
  staticMove = false,
  onDragStart,
  onDragMove,
  onDragEnd,
}: useDynamicListProps<T>) => {
  const [list, setList] = useState(initialData);
  const [position, setPosition] = useState<PositionType | null>(null);
  const [dragOffset, setDragOffset] = useState<PositionType>({ x: 0, y: 0 });
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
    null
  );
  const [draggingItemData, setDraggingItemData] = useState<T | null>(null);
  const [dragItemSize, setDragItemSize] = useState({ width: 0, height: 0 });
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const initialListRef = useRef(initialData);
  const listRef = useRef<HTMLUListElement>(null);

  const itemDrag = (e: MouseEvent, index: number) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggingItemIndex(index);
    setDraggingItemData(list[index]);
    setDragItemSize({ width: rect.width, height: rect.height });
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
    initialListRef.current = list;
    onDragStart?.(list, index);
  };

  const itemMove = (e: any) => {
    if (draggingItemIndex === null || !listRef.current) return;

    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);

    const children = Array.from(listRef.current.children) as HTMLElement[];
    const rects = children.map((child) => child.getBoundingClientRect());

    const filteredRects =
      staticMove || draggingItemIndex === -1
        ? rects
        : rects.filter((_, index) => index !== draggingItemIndex);

    const toIndex = findClosestIndex({
      position: newPosition,
      rects: filteredRects,
      horizontal,
      flexWrap,
    });

    if (toIndex === -1 || toIndex === null) {
      return;
    }

    let originalToIndex = toIndex;
    if (toIndex >= draggingItemIndex) {
      originalToIndex = toIndex + 1;
    }

    if (staticMove) {
      setDropTargetIndex(toIndex);
    } else {
      const fromIndex = list.findIndex((item) => item === draggingItemData);
      if (fromIndex !== -1 && originalToIndex !== fromIndex) {
        const updated = [...list];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(originalToIndex, 0, moved);
        setList(updated);
      }
    }
    onDragMove?.(list, draggingItemIndex);
  };

  const itemDrop = () => {
    if (draggingItemIndex === null) return;

    let finalIndex = -1;
    if (staticMove) {
      if (dropTargetIndex !== null && dropTargetIndex !== draggingItemIndex) {
        const updatedList = [...initialListRef.current];
        const [movedItem] = updatedList.splice(draggingItemIndex, 1);
        updatedList.splice(dropTargetIndex, 0, movedItem);
        setList(updatedList);
        finalIndex = dropTargetIndex;
      } else {
        setList(initialListRef.current);
        finalIndex = draggingItemIndex;
      }
    } else {
      finalIndex = list.findIndex((item) => item === draggingItemData);
    }

    onDragEnd?.(list, finalIndex);

    setDraggingItemIndex(null);
    setDraggingItemData(null);
    setPosition(null);
    setDropTargetIndex(null);
  };

  useEffect(() => {
    if (draggingItemData) {
      window.addEventListener("mousemove", itemMove);
      window.addEventListener("mouseup", itemDrop);
    }

    return () => {
      window.removeEventListener("mousemove", itemMove);
      window.removeEventListener("mouseup", itemDrop);
    };
  }, [draggingItemIndex, draggingItemData, dropTargetIndex, list, staticMove]);

  return {
    list,
    listRef,
    draggingItem: draggingItemIndex,
    draggingItemData,
    position,
    dragOffset,
    dragItemSize,
    dropTargetIndex: staticMove ? dropTargetIndex : null,
    itemDrag,
    itemMove,
    itemDrop,
  };
};
