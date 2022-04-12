import React, { useEffect, useState } from "react";
import moment from "moment";
import { ExpandMore, ExpandLess } from "../icons";
import { Group } from "../models/group";
import { Item } from "../models/item";
import { GanttButton } from "./GanttButton";
import { GanttChartBar } from "./GanttChartBar";
import { StatusBarTooltip } from "./StatusBarTooltip";

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
import {
  subtractMomentUnitStart,
  subtractMomentUnitEnd,
  addMomentUnitStart,
  addMomentUnitEnd,
  getCurrentUnitStart,
  getCurrentUnitEnd,
  getWeekRange,
  getWeekNumber,
} from "../utils/moment-utils";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";
import { TimeUnit } from "./types";

const GanttDateHeader = styled.div`
  background: #f0f0f0;
  color: black;
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
  background: #f0f0f0;
  color: white;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 3;
`;

const GroupMetadataBox = styled.div`
  display: flex;
  align-items: center;
  border-right: ${(props: { isLast?: boolean }) =>
    props.isLast ? "" : "1px solid black"};
  margin-right: 10px;
  width: 100px;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

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

type Props = {
  timeUnit: TimeUnit;
};

export const GanttChartBase: React.FC<Props> = ({ timeUnit }) => {
  const [groups, setGroups] = useState<Group[]>(getParentChildGroups);
  const [openGroups, setOpenGroups] = useState<any>({});
  const [items, setItems] = useState<TimelineItem<Item, number>[]>(MILESTONES);
  const [visibleTimeStart, setVisibleTimeStart] = useState<number>(
    getCurrentUnitStart(timeUnit)
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState<number>(
    getCurrentUnitEnd(
      timeUnit,
      timeUnit === "week" ? 4 : timeUnit === "month" ? 3 : 2
    )
  );

  useEffect(() => {
    const visibleStart = getCurrentUnitStart(timeUnit);
    const visibleEnd = getCurrentUnitEnd(
      timeUnit,
      timeUnit === "week" ? 4 : timeUnit === "month" ? 3 : 2
    );
    handleTimeChange(visibleStart, visibleEnd);
  }, [timeUnit]);

  const onPrevClick = () => {
    setVisibleTimeStart(subtractMomentUnitStart(visibleTimeStart, timeUnit));
    setVisibleTimeEnd(subtractMomentUnitEnd(visibleTimeEnd, timeUnit));
  };

  const onNextClick = () => {
    setVisibleTimeStart(addMomentUnitStart(visibleTimeStart, timeUnit));
    setVisibleTimeEnd(addMomentUnitEnd(visibleTimeEnd, timeUnit));
  };

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number
  ) => {
    setVisibleTimeStart(visibleTimeStart);
    setVisibleTimeEnd(visibleTimeEnd);
  };

  const handleItemMove = (itemId: Id, dragTime: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: moment(dragTime).startOf("week"),
              end: moment(
                dragTime +
                  (moment(item.end).valueOf() - moment(item.start).valueOf())
              ).startOf("week"),
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
              start: moment(edge === "left" ? time : item.start).startOf(
                "week"
              ),
              end: moment(edge === "left" ? item.end : time).endOf("week"),
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
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <GroupMetadataBox
                onClick={() => toggleGroup(group.id)}
                style={{ cursor: "pointer" }}
              >
                {openGroups[group.id] ? <ExpandMore /> : <ExpandLess />}{" "}
                {group.title}
              </GroupMetadataBox>
              <GroupMetadataBox>
                <div
                  style={{
                    display: "block",
                    marginRight: "inherit",
                    width: "100%",
                    height: "15px",
                  }}
                >
                  <StatusBarTooltip
                    content={
                      <div>
                        <div>Completed: 5 (50%)</div>
                        <div>In Progress: 2 (20%)</div>
                        <div>Remaining: 3 (30%)</div>
                      </div>
                    }
                  >
                    <ProgressBar
                      style={{
                        border: "1px solid grey",
                      }}
                    >
                      <ProgressBar striped variant="success" now={50} />
                      <ProgressBar striped now={20} />
                    </ProgressBar>
                  </StatusBarTooltip>
                </div>
              </GroupMetadataBox>
              <GroupMetadataBox>{"3 Devs"}</GroupMetadataBox>
            </div>
          ) : (
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <GroupMetadataBox style={{ paddingLeft: 20 }}>
                {group.title}
              </GroupMetadataBox>
              <GroupMetadataBox>
                <div
                  style={{
                    display: "block",
                    marginRight: "inherit",
                    width: "100%",
                    height: "15px",
                  }}
                >
                  <StatusBarTooltip
                    content={
                      <div>
                        <div>Completed: 5 (50%)</div>
                        <div>In Progress: 2 (20%)</div>
                        <div>Remaining: 3 (30%)</div>
                      </div>
                    }
                  >
                    <ProgressBar
                      style={{
                        border: "1px solid grey",
                      }}
                    >
                      <ProgressBar striped variant="success" now={50} />
                      <ProgressBar striped now={20} />
                    </ProgressBar>
                  </StatusBarTooltip>
                </div>
              </GroupMetadataBox>
              <GroupMetadataBox>{"3 Devs"}</GroupMetadataBox>
              <GroupMetadataBox>
                {`${moment().format("DD/MM/YYYY")}`}
              </GroupMetadataBox>
              <GroupMetadataBox isLast={true}>
                {`${moment().add(7, "days").format("DD/MM/YYYY")}`}
              </GroupMetadataBox>
            </div>
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
        minZoom={visibleTimeEnd - visibleTimeStart}
        maxZoom={visibleTimeEnd - visibleTimeStart}
        itemTouchSendsClick={false}
        stackItems
        sidebarWidth={550}
        lineHeight={60}
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
                <GanttSideBarHeader {...getRootProps()}></GanttSideBarHeader>
              );
            }}
          </SidebarHeader>
          <DateHeader
            unit={"month"}
            height={50}
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
            labelFormat={(dateRange) =>
              timeUnit === "week"
                ? getWeekRange(dateRange)
                : getWeekNumber(dateRange[0])
            }
            height={50}
            intervalRenderer={({ getIntervalProps, intervalContext }: any) => {
              return (
                <GanttDateHeader {...getIntervalProps()} isPrimary={false}>
                  {intervalContext.intervalText}
                </GanttDateHeader>
              );
            }}
          />
        </TimelineHeaders>
        <TimelineMarkers>
          <TodayMarker date={moment().valueOf()} interval={10000}>
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
      <GanttButton onClick={onPrevClick} text={"< Prev"} />
      <GanttButton onClick={onNextClick} text={"Next >"} />
    </div>
  );
};
