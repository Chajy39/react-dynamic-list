import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps } from "./types";
import "./style.css";

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
        ...containerStyle,
      }}
    >
      {hook.list.map((item, index) => {
        const isDragging = item === hook.draggingItemData;
        const style =
          isDragging && hook.position
            ? {
                left: hook.position.x - hook.dragOffset.x,
                top: hook.position.y - hook.dragOffset.y,
                width: hook.dragItemSize.width,
                height: hook.dragItemSize.height,
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }
            : {
                flex: uniformSize ? 1 : undefined,
              };

        return (
          <li
            key={getKey?.(item) || index}
            onMouseDown={(e) => hook.itemDrag(e, index)}
            className={`dynamic-list-item ${
              isDragging && hook.position ? "grabbed" : "not-grabbed"
            }`}
            style={{ ...style, ...itemStyle }}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
};
