import { Holiday } from "./calendar";
import dayjs from "dayjs";

const holidayMemos = new Map<number, Holiday[]>();

export function getHolidayByYear(year: number): Holiday[] {
  if (holidayMemos.has(year)) {
    return holidayMemos.get(year)!;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const holidays = require(`/holiday-cn/${year}.json`);
    if (holidays?.days?.length > 0) {
      holidayMemos.set(year, holidays.days);
      return holidays.days;
    }
    return [];
  } catch {
    return [];
  }
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function diffHoliday(start: Date, date2: Date) {
  let holidayNum = 0;
  const isRevert = start > date2;

  const { startDay, endDay } = isRevert
    ? { startDay: dayjs(date2), endDay: dayjs(start) }
    : { startDay: dayjs(start), endDay: dayjs(date2) };
  let currentDay = startDay;

  while (currentDay.isBefore(endDay, "day")) {
    const year = currentDay.year();
    const holidays = getHolidayByYear(year);
    // eslint-disable-next-line no-loop-func
    const holiday = holidays.find((holiday) => {
      return holiday.date === currentDay.format("YYYY-MM-DD");
    });
    if (holiday) {
      holiday.isOffDay && (holidayNum += 1);
    } else {
      isWeekend(currentDay.toDate()) && (holidayNum += 1);
    }
    currentDay = currentDay.add(1, "day");
  }

  return holidayNum;
}

export function diffHolidayByToday(date: Date) {
  return diffHoliday(new Date(), date);
}
