import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps } from "./types";

export const DynamicList = <T,>({
  items,
  renderItem,
  getKey,
  horizontal = false,
  flexWrap = false,
  uniformSize = false,
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
        display: "flex",
        padding: 0,
        margin: 0,
        flexWrap: flexWrap ? "wrap" : undefined,
        flexDirection: horizontal ? "row" : "column",
        position: "relative",
      }}
    >
      {hook.list.map((item, index) => {
        const isDragging = item === hook.draggingItemData;
        const style =
          isDragging && hook.position
            ? {
                position: "fixed" as const,
                left: hook.position.x - hook.dragOffset.x,
                top: hook.position.y - hook.dragOffset.y,
                width: hook.dragItemSize.width,
                height: hook.dragItemSize.height,
                PointerEvent: "none",
                zIndex: 1000,
                transform: "scale(1.05)",
                transition: "transform 0.1s ease",
                backgroundColor: "red",
                cursor: "grab",
              }
            : {
                flex: uniformSize ? 1 : undefined,
                transition: "transform 0.2s ease",
                cursor: "grab",
              };

        return (
          <li
            key={getKey?.(item) || index}
            onMouseDown={(e) => hook.itemDrag(e, index)}
            style={{
              ...style,
              flex: uniformSize ? 1 : undefined,
            }}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
};
