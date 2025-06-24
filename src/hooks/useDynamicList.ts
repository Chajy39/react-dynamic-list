import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDynamicListProps } from "../components/List/types";

export const useDynamicList = <T>({
  initialData,
  onDragStart,
  onDragMove,
  onDragEnd,
}: useDynamicListProps<T>) => {
  // 드래그 중 리스트
  const [list, setList] = useState(initialData);
  // 현재 커서 위치
  const [position, setPosition] = useState<PositionType | null>(null);
  // 아이템 중앙에 커서 위치 확인용 offset
  const [dragOffset, setDragOffset] = useState<PositionType>({ x: 0, y: 0 });

  const listRef = useRef<HTMLUListElement>(null);
  // 드래그 중인 아이템 index
  const draggingItemRef = useRef<number | null>(null);

  // onDrag
  const itemDrag = (e: MouseEvent, index: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // 아이템 중앙과 커서 위치 지정
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setPosition({ x: e.clientX, y: e.clientY });
    draggingItemRef.current = index;
    // custom Event
    onDragStart?.(list, index);
  };

  // onDrop
  const itemDrop = () => {
    // cleanup
    if (draggingItemRef.current) {
      // custom Event
      onDragEnd?.(list, draggingItemRef.current);
      draggingItemRef.current = null;
    }
    setPosition(null);
  };

  // onMove
  const itemMove = (e: MouseEvent) => {
    if (draggingItemRef.current === null || !listRef.current) return;

    // 아이템 위치 커서 위치로 설정
    const clientX = e.clientX;
    const clientY = e.clientY;
    setPosition({ x: clientX, y: clientY });

    // 현재 드래그 중 아이템 index 설정
    const fromIndex = draggingItemRef.current;
    const children = Array.from(listRef.current.children);
    // style로 리스트 수직 or 수평 판단
    const isHorizontal =
      getComputedStyle(listRef.current).flexDirection === "row";

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const rect = child.getBoundingClientRect();

      // 아이템의 중앙을 기점으로 리스트 순서 이동 여부 판단
      const center = isHorizontal
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
      const cursor = isHorizontal ? clientX : clientY;
      const targetIndex = cursor < center ? i : i + 1;

      if (targetIndex === fromIndex || targetIndex > list.length) continue;

      // 이동 위치 확인 후 리스트 위치 변경
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
      // custom Event
      onDragMove?.(updated, draggingItemRef.current);
      break;
    }
  };

  // 클릭을 놓아도 드래그 안풀리는 현상 보완
  useEffect(() => {
    const handleMouseUp = () => itemDrop();
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return {
    list,
    listRef,
    draggingItem: draggingItemRef.current,
    position,
    dragOffset,
    itemDrag,
    itemMove,
    itemDrop,
  };
};
