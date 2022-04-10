import moment, { Moment } from "moment";

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
  unit: moment.unitOfTime.DurationConstructor
) => moment().endOf(unit).valueOf();

export const getDateRange = ([startTime, endTime]: [Moment, Moment]): string =>
  `${moment(startTime).format("L")} - ${moment(endTime).format("L")}`;
