import {
  ReactCalendarItemRendererProps,
  TimelineItem,
} from "react-calendar-timeline";
import { Item } from "../models/item";
import styled from "@emotion/styled";
import React from "react";

export function GanttChartBar({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
}: ReactCalendarItemRendererProps<TimelineItem<Item, number>>) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? "yellow"
      : item.selectedBgColor
    : item.bgColor;
  const borderColor = itemContext.resizing ? "yellow" : item.color;

  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor,
          color: item.color,
          borderColor,
          borderStyle: "solid",
          borderRadius: 4,
          borderLeftWidth: itemContext.selected ? 3 : 1,
          borderRightWidth: itemContext.selected ? 3 : 1,
        },
      })}
    >
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

      <div
        style={{
          height: itemContext.dimensions.height,
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {itemContext.title}
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
    </div>
  );
}
