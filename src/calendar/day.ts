import dayjs from "dayjs";

export function diffDay(start: Date, end: Date) {
  return dayjs(end).diff(start, "day");
}

export function diffToday(date: Date) {
  return diffDay(new Date(), date);
}
