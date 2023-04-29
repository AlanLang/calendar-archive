import dayjs from "dayjs";

export function diffDay(start: Date, end: Date) {
  return dayjs(end).diff(start, "day");
}

export function diffToday(date: Date) {
  const today = new Date();
  return diffDay(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    date
  );
}
