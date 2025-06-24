import { MouseEvent, useRef, useState } from "react";
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

  const listRef = useRef<HTMLUListElement>(null);
  const draggingItemRef = useRef<number | null>(null);

  const itemDrag = (e: MouseEvent, index: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setPosition({ x: e.clientX, y: e.clientY });
    draggingItemRef.current = index;
    onDragStart?.(list, index);
  };

  const itemDrop = () => {
    if (draggingItemRef.current) {
      onDragEnd?.(list, draggingItemRef.current);
      draggingItemRef.current = null;
    }
    setPosition(null);
  };

  const itemMove = (e: MouseEvent) => {
    if (draggingItemRef.current === null || !listRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    setPosition({ x: clientX, y: clientY });

    const fromIndex = draggingItemRef.current;
    const children = Array.from(listRef.current.children);
    const isHorizontal =
      getComputedStyle(listRef.current).flexDirection === "row";

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const rect = child.getBoundingClientRect();

      const center = isHorizontal
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
      const cursor = isHorizontal ? clientX : clientY;
      const targetIndex = cursor < center ? i : i + 1;

      if (targetIndex === fromIndex || targetIndex > list.length) continue;

      const updated = [...list];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(
        targetIndex > fromIndex ? targetIndex - 1 : targetIndex,
        0,
        moved
      );

      draggingItemRef.current =
        targetIndex > fromIndex ? targetIndex - 1 : targetIndex;
      setList(updated);
      onDragMove?.(updated, draggingItemRef.current);
      break;
    }
  };

  return {
    list,
    listRef,
    draggingItem: draggingItemRef.current,
    position,
    itemDrag,
    itemMove,
    itemDrop,
  };
};
