import moment, { Moment } from "moment";

moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});

export const addMomentUnitStart = (
  time: number,
  unit: moment.unitOfTime.DurationConstructor
) => moment(time).add(1, unit).startOf(unit).valueOf();
export const addMomentUnitEnd = (
  time: number,
  unit: moment.unitOfTime.DurationConstructor
) => moment(time).add(1, unit).endOf(unit).valueOf();

export const subtractMomentUnitStart = (
  time: number,
  unit: moment.unitOfTime.DurationConstructor
) => moment(time).add(-1, unit).startOf(unit).valueOf();
export const subtractMomentUnitEnd = (
  time: number,
  unit: moment.unitOfTime.DurationConstructor
) => moment(time).add(-1, unit).endOf(unit).valueOf();

export const getCurrentUnitStart = (
  unit: moment.unitOfTime.DurationConstructor
) => moment().startOf(unit).valueOf();
export const getCurrentUnitEnd = (
  unit: moment.unitOfTime.DurationConstructor,
  quantity: number
) => moment().add(quantity, unit).startOf(unit).valueOf();

export const getWeekRange = ([startTime, endTime]: [Moment, Moment]): string =>
  `${moment(startTime).format("l")} - ${moment(endTime).format("l")}`;

export const getWeekNumber = (startTime: Moment): string =>
  `Week ${moment(startTime).week()}`;
