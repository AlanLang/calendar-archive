import * as Calendar from "@zhengxs/calendar-data";
import { getHolidayByYear } from "./holiday";

export const now = new Date();
function isToday(year: number, month: number, date: number) {
  return (
    now.getFullYear() === year &&
    now.getMonth() === month - 1 &&
    now.getDate() === date
  );
}

export interface DateCell {
  year: number;
  month: number;
  date: number;
  week: number;
  isToday: boolean;
  isPrevMonth: boolean;
  isCurrentMonth: boolean;
  isNextMonth: boolean;
  weekIndex: number;
  dateStr: string;
  holiday?: Holiday;
  position: [number, number];
  d: Date;
  ctx: {
    year: number;
    month: number;
  };
}

export function getWeekNumber(date: Date) {
  // 获取今年的第一天
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

  // 计算今年的第一周的结束日期
  const endOfFirstWeek = new Date(
    firstDayOfYear.getTime() + (7 - firstDayOfYear.getDay()) * 86400000
  );

  // 如果第一周不满7天，则认为它属于上一年
  if (firstDayOfYear.getDay() > 1) {
    endOfFirstWeek.setDate(endOfFirstWeek.getDate() - 7);
  }

  // 计算指定日期的周一
  const monday = new Date(date.getTime());
  monday.setDate(monday.getDate() - ((date.getDay() + 6) % 7));

  // 计算指定日期属于今年的第几周
  const week =
    Math.ceil((monday.getTime() - endOfFirstWeek.getTime()) / (7 * 86400000)) +
    1;

  return week;
}

export interface Holiday {
  name: string;
  date: string;
  isOffDay: true;
  index: number;
  total: number;
}

export const calendar = Calendar.create({
  firstWeekDay: 1,
  locale: "cn",
  iteratee(d, ctx) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const cell: DateCell = {
      year,
      month,
      date,
      week: d.getDay(),
      isToday: isToday(year, month, date),
      isPrevMonth: false,
      isCurrentMonth: false,
      isNextMonth: false,
      weekIndex: getWeekNumber(d),
      position: [0, 0],
      dateStr: `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`,
      ctx,
      d,
    };

    if (ctx.year === year) {
      if (month < ctx.month) {
        cell.isPrevMonth = true;
      } else if (month > ctx.month) {
        cell.isNextMonth = true;
      } else {
        cell.isCurrentMonth = true;
      }
    } else if (ctx.year > year) {
      cell.isPrevMonth = true;
    } else {
      cell.isNextMonth = true;
    }

    return cell;
  },
});

export function getMonthCalder(year: number, month: number) {
  const holidays = getHolidayByYear(year);
  const result = calendar.getMonthCalendar(year, month);
  result.forEach((week, weekIndex) => {
    week.forEach((day, dayIndex) => {
      const holiday = holidays.find((item) => item.date === day.dateStr);
      if (holiday) {
        const sameTodayHolidays = holidays.filter(
          (item) =>
            item.name === holiday.name && item.isOffDay === holiday.isOffDay
        );
        const index = sameTodayHolidays.findIndex(
          (item) => item.date === holiday.date
        );
        day.holiday = {
          ...holiday,
          index,
          total: sameTodayHolidays.length,
        };
      }
      day.position = [weekIndex, dayIndex];
    });
  });
  return result;
}
