import React from "react";
import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps } from "./types";

export const DynamicList = <T,>({
  items,
  renderItem,
  getKey,
  horizontal = false,
  flexWrap = false,
  onDragStart,
  onDragMove,
  onDragEnd,
}: DynamicListProps<T>) => {
  const hook = useDynamicList({
    initialData: items,
    onDragStart,
    onDragMove,
    onDragEnd,
  });

  return (
    <ul
      ref={hook.listRef}
      onMouseMove={hook.itemMove}
      onMouseUp={hook.itemDrop}
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexWrap: flexWrap ? "wrap" : undefined,
        flexDirection: horizontal ? "row" : "column",
        position: "relative",
      }}
    >
      {items.map((item, index) => {
        const isDragging = hook.draggingItem === index;
        const style =
          isDragging && hook.position
            ? {
                position: "fixed" as const,
                left: hook.position.x,
                top: hook.position.y,
                pointerEvent: "none",
                zIndex: 1000,
                transform: "scale(1.05)",
                transition: "transform 0.1s ease",
              }
            : {
                transition: "transform 0.2s ease",
                cursor: "grab",
              };

        return (
          <li
            key={getKey?.(item) || index}
            onMouseDown={(e) => hook.itemDrag(e, index)}
            style={style}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
};
