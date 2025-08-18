import { CSSProperties } from "react";
import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps } from "./types";

export const DynamicList = <T,>({
  items,
  renderItem,
  getKey,
  horizontal = false,
  flexWrap = false,
  uniformSize = false,
  staticMove = false,
  onDragStart,
  onDragMove,
  onDragEnd,
  containerStyle,
  itemStyle,
  targetItemStyle,
}: DynamicListProps<T>) => {
  const hook = useDynamicList({
    initialData: items,
    horizontal,
    flexWrap,
    staticMove,
    onDragStart,
    onDragMove,
    onDragEnd,
  });

  return (
    <ul
      ref={hook.listRef}
      className="dynamic-list-container"
      style={{
        flexWrap: flexWrap ? "wrap" : undefined,
        flexDirection: horizontal ? "row" : "column",
        position: "relative",
        display: "flex",
        listStyle: "none",
        padding: "0",
        margin: "0",
        ...containerStyle,
      }}
    >
      {hook.list.map((item, index) => {
        const isDragging = !staticMove && item === hook.draggingItemData;

        const style: CSSProperties =
          isDragging && hook.position
            ? {
                left: `${hook.position.x - hook.dragOffset.x}px`,
                top: `${hook.position.y - hook.dragOffset.y}px`,
                width: `${hook.dragItemSize.width}px`,
                height: `${hook.dragItemSize.height}px`,
                ...targetItemStyle,
              }
            : {
                flex: uniformSize ? 1 : undefined,
                transition: "transform 0.2s ease",
                cursor: "grab",
              };
        const draggingStyle: CSSProperties = {
          position: "fixed",
          pointerEvents: "none",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transform: "scale(1.05)",
          wordBreak: "break-all",
        };
        const notDraggingStyle: CSSProperties = {
          wordBreak: "break-all",
        };

        const isDropTarget = staticMove && index === hook.dropTargetIndex;

        return (
          <li
            key={getKey?.(item) || index}
            onMouseDown={(e) => hook.itemDrag(e, index)}
            className={`dynamic-list-item ${
              isDragging ? "grabbed" : "not-grabbed"
            } ${isDropTarget ? "drop-target" : ""}`}
            style={{
              ...style,
              ...itemStyle,
              ...(isDragging ? draggingStyle : notDraggingStyle),
            }}
          >
            {renderItem(item)}
          </li>
        );
      })}

      {hook.draggingItemData && staticMove && hook.position && (
        <li
          className="dynamic-list-item grabbed"
          style={{
            left: `${hook.position.x - hook.dragOffset.x}px`,
            top: `${hook.position.y - hook.dragOffset.y}px`,
            width: `${hook.dragItemSize.width}px`,
            height: `${hook.dragItemSize.height}px`,
            ...targetItemStyle,
          }}
        >
          {renderItem(hook.draggingItemData)}
        </li>
      )}
    </ul>
  );
};
