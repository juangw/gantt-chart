import moment from "moment";

moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});

export const EPICS = [
  {
    id: 1,
    title: "EPIC A1",
  },
  {
    id: 2,
    title: "EPIC A2",
  },
  {
    id: 3,
    title: "EPIC A3",
  },
  {
    id: 4,
    title: "EPIC A4",
  },
  {
    id: 5,
    title: "EPIC B1",
  },
  {
    id: 6,
    title: "EPIC B2",
  },
  {
    id: 7,
    title: "EPIC B3",
  },
  {
    id: 8,
    title: "EPIC B4",
  },
  {
    id: 9,
    title: "EPIC C1",
  },
  {
    id: 10,
    title: "EPIC C2",
  },
  {
    id: 9,
    title: "EPIC C3",
  },
  {
    id: 10,
    title: "EPIC C4",
  },
];

export const MILESTONES = [
  {
    id: 1,
    group: 1,
    title: "Baseball 8u Practice",
    start: moment().startOf("week").startOf("week"),
    end: moment().add(2, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 2,
    group: 2,
    title: "Baseball 4u Practice",
    start: moment().add(-3, "week").startOf("week"),
    end: moment().add(1, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 3,
    group: 2,
    title: "Tournament Start",
    start: moment().add(2, "week").startOf("week"),
    end: moment().add(4, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 4,
    group: 3,
    title: "Baseball 8u Game (Red team vs. Blue Team)",
    start: moment().add(0, "week").startOf("week"),
    end: moment()
      .startOf("week")
      .startOf("week")
      .add(4, "week")
      .startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 5,
    group: 3,
    title: "Practice",
    start: moment().add(5, "week").startOf("week"),
    end: moment().add(9, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 6,
    group: 4,
    title: "8u Baseball Tournament",
    start: moment()
      .startOf("week")
      .startOf("week")
      .add(-2, "week")
      .startOf("week"),
    end: moment().add(6, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 7,
    group: 5,
    title: "Opening Ceremonies",
    start: moment().add(-2.5, "week").startOf("week"),
    end: moment().add(1.5, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 8,
    group: 6,
    title: "Game 1 Red vs. Blue",
    start: moment()
      .startOf("week")
      .startOf("week")
      .add(-0.25, "week")
      .startOf("week"),
    end: moment().add(3.25, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 9,
    group: 6,
    title: "Game 2 Green vs. Orange",
    start: moment().add(4.5, "week").startOf("week"),
    end: moment().add(6, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 10,
    group: 7,
    title: "Jane Doe",
    start: moment().add(-0.5, "week").startOf("week"),
    end: moment().add(7, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 11,
    group: 8,
    title: "John Doe",
    start: moment().add(-7, "week").startOf("week"),
    end: moment()
      .startOf("week")
      .startOf("week")
      .add(-1, "week")
      .startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 12,
    group: 8,
    title: "John Doe",
    start: moment().add(0.25, "week").startOf("week"),
    end: moment()
      .startOf("week")
      .startOf("week")
      .add(1.75, "week")
      .startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 13,
    group: 8,
    title: "Jane Doe",
    start: moment().add(2.75, "week").startOf("week"),
    end: moment().add(6, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
  {
    id: 14,
    group: 10,
    title: "John Doe",
    start: moment().add(2, "week").startOf("week"),
    end: moment().add(10, "week").startOf("week"),
    start_time: moment().startOf("month").valueOf(),
    end_time: moment().endOf("month").valueOf(),
    selectedBgColor: "yellow",
    bgColor: "orange",
    color: "black",
  },
];

const EpicsMapTemp = {};
EPICS.forEach((epic) => {
  EpicsMapTemp[epic.id] = epic;
});

export const epicsMappedById = EpicsMapTemp;
