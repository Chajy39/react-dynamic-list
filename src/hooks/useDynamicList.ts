import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDynamicListProps } from "../components/List/types";

export const useDynamicList = <T>({
  initialData,
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

  const listRef = useRef<HTMLUListElement>(null);

  const findClosestIndex = (pos: { x: number; y: number }): number => {
    if (!listRef.current) return 0;
    const children = Array.from(listRef.current.children) as HTMLElement[];

    let minDist = Infinity;
    let closestIdx = 0;

    children.forEach((child, idx) => {
      const rect = child.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(pos.x - cx, pos.y - cy);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });

    return closestIdx;
  };

  const itemDrag = (e: MouseEvent | React.MouseEvent, index: number) => {
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
      x: "clientX" in e ? e.clientX : 0,
      y: "clientY" in e ? e.clientY : 0,
    });
    onDragStart?.(list, index);
  };

  const itemMove = (e: React.MouseEvent) => {
    if (!draggingItemData) return;

    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);

    const fromIndex = list.findIndex((item) => item === draggingItemData);
    const toIndex = findClosestIndex(newPosition);

    if (fromIndex !== -1 && toIndex !== fromIndex) {
      const updated = [...list];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setList(updated);
    }

    if (fromIndex !== -1) {
      onDragMove?.(list, fromIndex);
    }
  };

  const itemDrop = () => {
    if (!draggingItemData || !position) return;

    const fromIndex = list.findIndex((item) => item === draggingItemData);
    const toIndex = findClosestIndex(position);
    if (fromIndex === -1) return;

    const updated = [...list];
    if (fromIndex !== toIndex) {
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setList(updated);
    }

    onDragEnd?.(updated, toIndex);

    setDraggingItemIndex(null);
    setDraggingItemData(null);
    setPosition(null);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (draggingItemData) itemDrop();
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [draggingItemData, position]);

  return {
    list,
    listRef,
    draggingItem: draggingItemIndex,
    draggingItemData,
    position,
    dragOffset,
    dragItemSize,
    itemDrag,
    itemMove,
    itemDrop,
  };
};
