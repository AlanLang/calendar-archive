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
  isToday: boolean;
  isPrevMonth: boolean;
  isCurrentMonth: boolean;
  isNextMonth: boolean;
}

export const calendar = Calendar.create({
  iteratee(d, ctx) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    const cell: DateCell = {
      year,
      month,
      date,
      isToday: isToday(year, month, date),
      isPrevMonth: false,
      isCurrentMonth: false,
      isNextMonth: false,
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
