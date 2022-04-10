import React, { useState } from "react";
import moment from "moment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ExpandMore, ExpandLess } from "../icons";
import { Group } from "../models/group";
import { Item } from "../models/item";
import { GanttChartBar } from "./GanttChartBar";

import Timeline, {
  TimelineHeaders,
  DateHeader,
  Id,
  TimelineItem,
  SidebarHeader,
  TodayMarker,
  TimelineMarkers,
} from "react-calendar-timeline";

import { MILESTONES, EPICS } from "../data";
import "react-calendar-timeline/lib/Timeline.css";
import {
  subtractMomentUnitStart,
  subtractMomentUnitEnd,
  addMomentUnitStart,
  addMomentUnitEnd,
  getCurrentUnitStart,
  getCurrentUnitEnd,
  getDateRange,
} from "../utils/moment-utils";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { MyThemedProps } from "../theme";

const GanttButton = styled(Button)`
  && {
    background: ${(props: MyThemedProps<{}>) =>
      props.theme.palette.primary.main};
    color: white;
  }
`;

const GanttDateHeader = styled.div`
  background: ${(props: MyThemedProps<{ isPrimary: boolean }>) =>
    props.isPrimary ? props.theme.palette.primary.main : "#f0f0f0"};
  color: ${(props: { isPrimary: boolean }) =>
    props.isPrimary ? "white" : "black"};
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100%;
  border-bottom: 1px solid #bbb;
  border-right: 2px solid #bbb;
  cursor: pointer;
  font-size: ${(props: { isPrimary: boolean }) =>
    props.isPrimary ? "14px" : "12px"};
`;

const GanttSideBarHeader = styled.div`
  background: ${(props: MyThemedProps<{}>) => props.theme.palette.primary.main};
  color: white;
  border-right: 1px solid #bbb;
  padding: 3;
`;

type TimeUnit = "quarter" | "month" | "week";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

// TODO: Remove setting up fake nested data
const getParentChildGroups = EPICS.map((group) => {
  const isRoot = (group.id - 1) % 2 === 0;
  const parent = isRoot ? null : Math.floor((group.id - 1) / 2) * 2 + 1;

  return Object.assign({}, group, {
    root: isRoot,
    parent: parent,
  });
});

export function GanttChart() {
  const [groups, setGroups] = useState<Group[]>(getParentChildGroups);
  const [openGroups, setOpenGroups] = useState<any>({});
  const [items, setItems] = useState<TimelineItem<Item, number>[]>(MILESTONES);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("week");
  const [visibleTimeStart, setVisibleTimeStart] = useState<number>(
    getCurrentUnitStart(timeUnit)
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState<number>(
    getCurrentUnitEnd(timeUnit)
  );

  const onPrevClick = () => {
    setVisibleTimeStart(subtractMomentUnitStart(visibleTimeStart, timeUnit));
    setVisibleTimeEnd(subtractMomentUnitEnd(visibleTimeStart, timeUnit));
  };

  const onNextClick = () => {
    setVisibleTimeStart(addMomentUnitStart(visibleTimeStart, timeUnit));
    setVisibleTimeEnd(addMomentUnitEnd(visibleTimeStart, timeUnit));
  };

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number
  ) => {
    setVisibleTimeStart(visibleTimeStart);
    setVisibleTimeEnd(visibleTimeEnd);
  };

  const handleTimeHeaderChange = (event: SelectChangeEvent) => {
    const timeUnit = event.target.value as TimeUnit;
    setVisibleTimeStart(getCurrentUnitStart(timeUnit));
    setVisibleTimeEnd(getCurrentUnitEnd(timeUnit));
    setTimeUnit(timeUnit);
  };

  const handleItemMove = (itemId: Id, dragTime: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: moment(dragTime).startOf("day"),
              end: moment(
                dragTime +
                  (moment(item.end).valueOf() - moment(item.start).valueOf())
              ).startOf("day"),
            })
          : item
      )
    );
  };

  const handleItemResize = (itemId: Id, time: number, edge: any) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: moment(edge === "left" ? time : item.start).startOf("day"),
              end: moment(edge === "left" ? item.end : time).endOf("day"),
            })
          : item
      )
    );
  };

  const toggleGroup = (id: number) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  const setupNestedGroups = () => {
    return groups
      .filter((g) => g.root || openGroups[g.parent as number])
      .map((group) => {
        return Object.assign({}, group, {
          title: group.root ? (
            <div
              onClick={() => toggleGroup(group.id)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {openGroups[group.id] ? <ExpandLess /> : <ExpandMore />}{" "}
              {group.title}
            </div>
          ) : (
            <div style={{ paddingLeft: 20 }}>{group.title}</div>
          ),
        });
      });
  };

  return (
    <div>
      <Timeline
        groups={setupNestedGroups()}
        items={items}
        keys={keys}
        minZoom={60 * 60 * 1000 * 24}
        itemTouchSendsClick={false}
        stackItems
        sidebarWidth={500}
        lineHeight={75}
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        canChangeGroup={false}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        onTimeChange={handleTimeChange}
        itemRenderer={GanttChartBar}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <GanttSideBarHeader {...getRootProps()}>
                  <Select
                    value={timeUnit}
                    label="Time Unit"
                    onChange={handleTimeHeaderChange}
                  >
                    <MenuItem value={"week"}>Week</MenuItem>
                    <MenuItem value={"month"}>Month</MenuItem>
                    <MenuItem value={"quarter"}>Quarter</MenuItem>
                  </Select>
                </GanttSideBarHeader>
              );
            }}
          </SidebarHeader>
          <DateHeader
            unit={"month"}
            height={60}
            intervalRenderer={({ getIntervalProps, intervalContext }: any) => {
              return (
                <GanttDateHeader {...getIntervalProps()} isPrimary>
                  {intervalContext.intervalText}
                </GanttDateHeader>
              );
            }}
          />
          <DateHeader
            unit={"week"}
            labelFormat={getDateRange}
            height={60}
            intervalRenderer={({ getIntervalProps, intervalContext }: any) => {
              return (
                <GanttDateHeader {...getIntervalProps()} isPrimary={false}>
                  {intervalContext.intervalText}
                </GanttDateHeader>
              );
            }}
          />
          {timeUnit !== "quarter" ? (
            <DateHeader
              unit={"day"}
              height={50}
              intervalRenderer={({
                getIntervalProps,
                intervalContext,
              }: any) => {
                return (
                  <GanttDateHeader {...getIntervalProps({})} isPrimary={false}>
                    {intervalContext.intervalText}
                  </GanttDateHeader>
                );
              }}
            />
          ) : (
            <></>
          )}
        </TimelineHeaders>
        <TimelineMarkers>
          <TodayMarker date={moment().valueOf()}>
            {({ styles }) => {
              const customStyles = {
                ...styles,
                backgroundColor: "green",
                width: "2px",
                zIndex: 99,
              };
              return <div style={customStyles} />;
            }}
          </TodayMarker>
        </TimelineMarkers>
      </Timeline>
      <GanttButton variant="contained" onClick={onPrevClick}>
        {"< Prev"}
      </GanttButton>
      <GanttButton variant="contained" onClick={onNextClick}>
        {"Next >"}
      </GanttButton>
    </div>
  );
}