import * as Calendar from "@zhengxs/calendar-data";

const now = new Date();
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
      ctx,
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
