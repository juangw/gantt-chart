import { Moment } from "moment";

export type Item = {
  id: number;
  group: number;
  title: string;
  start: Moment;
  end: Moment;
  start_time: number;
  end_time: number;
  selectedBgColor: string;
  bgColor: string;
  color: string;
};
