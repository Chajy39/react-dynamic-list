import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps } from "./types";

export const DynamicList = <T,>(props: DynamicListProps<T>) => {
  const {
    items,
    renderItem,
    getKey,
    horizontal = false,
    flexWrap = false,
    uniformSize,
    staticMove = false,
    draggable = false,
    onDragStart,
    onDragMove,
    onDragEnd,
    containerStyle,
    itemStyle,
    targetItemStyle,
  } = props;

  const hook = useDynamicList({
    initialData: items,
    horizontal,
    flexWrap,
    staticMove,
    draggable,
    onDragStart,
    onDragMove,
    onDragEnd,
  });

  return (
    <>
      <ul
        ref={hook.listRef}
        className="dynamic-list-container"
        style={{
          position: "relative",
          listStyle: "none",
          padding: "0",
          margin: "0",
          display: "flex",
          flexWrap: flexWrap ? "wrap" : undefined,
          flexDirection: horizontal ? "row" : "column",
          ...containerStyle,
        }}
      >
        {hook.list.map((item, index) => {
          const isDragging = !staticMove && item === hook.draggingItemData;
          const style: React.CSSProperties =
            isDragging && hook.position
              ? {
                  display: "none",
                  cursor: draggable ? "default" : "grab",
                }
              : {
                  transition: "transform 0.2s ease",
                  cursor: draggable ? "default" : "grab",
                  flex: uniformSize ? 1 : undefined,
                };

          const isDropTarget = staticMove && index === hook.dropTargetIndex;

          return (
            <li
              key={getKey?.(item) || index}
              onMouseDown={(e) => hook.itemDrag(e, index)}
              className={`dynamic-list-item ${
                isDragging ? "grabbed" : "not-grabbed"
              } ${isDropTarget ? "drop-target" : ""}`}
              style={{ ...style, ...itemStyle }}
            >
              {renderItem(item)}
            </li>
          );
        })}
      </ul>
      {hook.draggingItemData && hook.position && (
        <div
          className="dynamic-list-item grabbed"
          style={{
            position: "absolute",
            zIndex: 1000,
            left: hook.position.x - hook.dragItemSize.width / 2,
            top: hook.position.y - hook.dragItemSize.height / 2,
            width: hook.dragItemSize.width,
            height: hook.dragItemSize.height,
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transform: "scale(0.95)",
            transition: "transform 0.2s ease",
            cursor: draggable ? "default" : "grab",
            ...targetItemStyle,
          }}
        >
          {renderItem(hook.draggingItemData)}
        </div>
      )}
    </>
  );
};
