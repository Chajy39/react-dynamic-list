import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDynamicListProps } from "../components/List/types";

export const useDynamicList = <T>({
  initialData,
  horizontal,
  flexWrap,
  // staticMove,
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

  const listRef = useRef<HTMLUListElement>(null);

  const findClosestIndex = (position: { x: number; y: number }): number => {
    if (!listRef.current) return -1;
    const children = Array.from(listRef.current.children) as HTMLElement[];

    if (children.length === 0) return -1;

    let closestIndex = -1;
    let minDistance = Infinity;

    if (flexWrap) {
      children.forEach((child, index) => {
        // if (staticMove && index === draggingItemIndex) return;

        const rect = child.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
    } else {
      const firstRect = children[0].getBoundingClientRect();
      const lastRect = children[children.length - 1].getBoundingClientRect();

      if (horizontal) {
        if (position.x < firstRect.left) return 0;
        if (position.x > lastRect.right) return children.length - 1;
      } else {
        if (position.y < firstRect.top) return 0;
        if (position.y > lastRect.bottom) return children.length - 1;
      }

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = horizontal
          ? Math.abs(position.x - centerX)
          : Math.abs(position.y - centerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
    }

    return closestIndex;
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
      x: e.clientX,
      y: e.clientY,
    });
    onDragStart?.(list, index);
  };

  const itemMove = (e: any) => {
    if (!draggingItemData) return;

    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
    const toIndex = findClosestIndex(newPosition);

    if (toIndex === -1) return;

    // if (staticMove) {
    //   setDropTargetIndex(toIndex);
    // } else {
    const fromIndex = list.findIndex((item) => item === draggingItemData);
    if (fromIndex !== -1 && toIndex !== fromIndex) {
      const updated = [...list];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setList(updated);
    }
    // }

    onDragMove?.(list, draggingItemIndex!);
  };

  const itemDrop = () => {
    if (draggingItemIndex === null) return;

    // if (staticMove) {
    //   if (dropTargetIndex !== null && dropTargetIndex !== draggingItemIndex) {
    //     const updatedList = [...list];
    //     const [movedItem] = updatedList.splice(draggingItemIndex, 1);
    //     updatedList.splice(dropTargetIndex, 0, movedItem);
    //     setList(updatedList);
    //     onDragEnd?.(updatedList, draggingItemIndex);
    //   } else {
    //     onDragEnd?.(list, draggingItemIndex);
    //   }
    // } else {
    const finalIndex = list.findIndex((item) => item === draggingItemData);
    onDragEnd?.(list, draggingItemIndex);
    // }

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
  }, [
    draggingItemIndex,
    draggingItemData,
    dropTargetIndex,
    list /*staticMove*/,
  ]);

  return {
    list,
    listRef,
    draggingItem: draggingItemIndex,
    draggingItemData,
    position,
    dragOffset,
    dragItemSize,
    dropTargetIndex: /*staticMove ? dropTargetIndex :*/ null,
    itemDrag,
    itemMove,
    itemDrop,
  };
};
