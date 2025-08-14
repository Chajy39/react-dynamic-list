import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDynamicListProps } from "../components/List/types";

type PositionType = { x: number; y: number };

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

  // 커서 위치에서 가장 가까운 아이템 index 찾기
  const findClosestIndex = (
    position: PositionType,
    rects: DOMRect[]
  ): number => {
    if (rects.length === 0) return -1;

    if (staticMove) {
      const isHorizontal = horizontal;
      const key = isHorizontal ? "x" : "y";
      const startProp = isHorizontal ? "left" : "top";
      const endProp = isHorizontal ? "right" : "bottom";

      if (position[key] <= rects[0][startProp]) return 0;

      if (position[key] >= rects[rects.length - 1][endProp])
        return rects.length - 1;

      for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        const rectEnd = rect[endProp];

        if (i < rects.length - 1) {
          const nextRect = rects[i + 1];
          const nextRectStart = nextRect[startProp];
          const gapMidpoint = (rectEnd + nextRectStart) / 2;

          if (position[key] >= rectEnd && position[key] <= gapMidpoint) {
            return i;
          }

          if (position[key] > gapMidpoint && position[key] < nextRectStart) {
            return i + 1;
          }
        }

        if (position[key] >= rect[startProp] && position[key] <= rectEnd) {
          return i;
        }
      }

      return -1;
    } else {
      let closestIndex = -1;
      let minDistance = Infinity;

      rects.forEach((rect, index) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = flexWrap
          ? Math.sqrt(
              Math.pow(position.x - centerX, 2) +
                Math.pow(position.y - centerY, 2)
            )
          : horizontal
          ? Math.abs(position.x - centerX)
          : Math.abs(position.y - centerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }
  };

  // 드래그
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

  // 드래그 후 이동
  const itemMove = (e: any) => {
    if (draggingItemIndex === null || !listRef.current) return;

    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);

    const children = Array.from(listRef.current.children) as HTMLElement[];
    const rects = children.map((child) => child.getBoundingClientRect());

    const toIndex = findClosestIndex({ x: e.clientX, y: e.clientY }, rects);

    if (toIndex === -1 || toIndex === null) {
      return;
    }

    if (staticMove) {
      setDropTargetIndex(toIndex);
    } else {
      const fromIndex = list.findIndex((item) => item === draggingItemData);
      if (fromIndex !== -1 && toIndex !== fromIndex) {
        const updated = [...list];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setList(updated);
      }
    }

    onDragMove?.(list, draggingItemIndex);
  };

  // 드롭
  const itemDrop = () => {
    if (draggingItemIndex === null) return;

    if (staticMove) {
      if (dropTargetIndex !== null && dropTargetIndex !== draggingItemIndex) {
        const updatedList = [...initialListRef.current];
        const [movedItem] = updatedList.splice(draggingItemIndex, 1);

        const finalDropIndex =
          dropTargetIndex > draggingItemIndex
            ? dropTargetIndex - 1
            : dropTargetIndex;

        updatedList.splice(finalDropIndex, 0, movedItem);
        setList(updatedList);
        onDragEnd?.(updatedList, draggingItemIndex);
      } else {
        onDragEnd?.(initialListRef.current, draggingItemIndex);
      }
    } else {
      const finalIndex = list.findIndex((item) => item === draggingItemData);
      onDragEnd?.(list, finalIndex);
    }

    setDraggingItemIndex(null);
    setDraggingItemData(null);
    setPosition(null);
    setDropTargetIndex(null);
  };

  useEffect(() => {
    if (draggingItemData) {
      window.addEventListener("mousemove", itemMove);
      window.addEventListener("mouseup", itemDrop, {
        once: true,
      });
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
