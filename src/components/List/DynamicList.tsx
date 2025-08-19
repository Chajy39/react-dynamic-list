import { useEffect } from "react";
import { useDynamicList } from "../../hooks/useDynamicList";
import { DynamicListProps, ListFlexProps, ListGridProps } from "./types";

export const DynamicList = <T,>(props: DynamicListProps<T>) => {
  const {
    items,
    renderItem,
    getKey,
    type,
    staticMove = false,
    onDragStart,
    onDragMove,
    onDragEnd,
    containerStyle,
    itemStyle,
    targetItemStyle,
  } = props;

  let listStyle: React.CSSProperties | null = null;
  let listItemStyle: React.CSSProperties | null = null;
  let hook = null;

  if (props.type === "grid") {
    const { cols, rows } = props;

    hook = useDynamicList({
      initialData: items,
      flexWrap: true,
      staticMove,
      onDragStart,
      onDragMove,
      onDragEnd,
    });
    listStyle = {
      display: "grid",
      gridTemplateColumns: cols ? `repeat(${cols}, minmax(0, 1fr))` : undefined,
      gridTemplateRows: rows ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
    };
  } else if (props.type === "flex") {
    const { horizontal = false, flexWrap = false, uniformSize } = props;

    hook = useDynamicList({
      initialData: items,
      horizontal,
      flexWrap,
      staticMove,
      onDragStart,
      onDragMove,
      onDragEnd,
    });
    listStyle = {
      display: "flex",
      flexWrap: flexWrap ? "wrap" : undefined,
      flexDirection: horizontal ? "row" : "column",
    };
    listItemStyle = {
      flex: uniformSize ? 1 : undefined,
    };
  }

  if (!hook) return;

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
          ...containerStyle,
          ...listStyle,
        }}
      >
        {hook.list.map((item, index) => {
          const isDragging = !staticMove && item === hook.draggingItemData;
          const style: React.CSSProperties =
            isDragging && hook.position
              ? {
                  display: "none",
                }
              : {
                  transition: "transform 0.2s ease",
                  ...listItemStyle,
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
            ...targetItemStyle,
          }}
        >
          {renderItem(hook.draggingItemData)}
        </div>
      )}
    </>
  );
};
