import { DateCell } from "../../calendar/calendar";
import { diffToday } from "../../calendar/day";
import { diffHolidayByToday } from "../../calendar/holiday";
import { WEEK_NAMES } from "./constant";

function Today({ value }: { value: DateCell }) {
  let label = "今天";
  if (!value.isToday) {
    const day = diffToday(value.d);
    const holiday = diffHolidayByToday(value.d);
    label = day > 0 ? `距今 ${day} 天后` : `距今 ${0 - day} 天前`;
    label += holiday ? `, 共 ${holiday} 天假期` : "";
  }

  return (
    <div className="text-base" data-testid="calender-day-pop-today">
      {label}
    </div>
  );
}

export function CalenderDayPop({ value }: { value: DateCell }) {
  const weekIndex = value.week === 0 ? 6 : value.week - 1;
  return (
    <div className="bg-secondary-800 text-white inline-flex flex-col text-xl py-5 px-10 opacity-95">
      <div data-testid="calender-day-pop-title">
        {`${value.year}年${value.month}月${value.date}日 星期${WEEK_NAMES[weekIndex]} 第 ${value.weekIndex} 周`}
      </div>
      <Today value={value} />
    </div>
  );
}
