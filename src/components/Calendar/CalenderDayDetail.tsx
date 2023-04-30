import { memo } from "react";
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

  return <div data-testid="calender-day-pop-today">{label}</div>;
}

function Holiday({ value }: { value: DateCell }) {
  if (!value.holiday) {
    return null;
  }

  if (value.holiday.isOffDay) {
    return (
      <div>
        {value.holiday.name} 假期 {value.holiday.index + 1}
        <span className="mx-0.5">/</span>
        {value.holiday.total}
      </div>
    );
  }

  if (!value.holiday.isOffDay) {
    return (
      <div>
        {value.holiday.name} 补班 {value.holiday.index + 1}
        <span className="mx-0.5">/</span>
        {value.holiday.total}
      </div>
    );
  }
  return null;
}

export const CalenderDayDetail = memo(({ value }: { value: DateCell }) => {
  const weekIndex = value.week === 0 ? 6 : value.week - 1;
  return (
    <div className="inline-flex w-full flex-col bg-secondary-800 px-10 py-5 text-xl text-white opacity-95">
      <div data-testid="calender-day-pop-title">
        {`${value.year}年${value.month}月${value.date}日 星期${WEEK_NAMES[weekIndex]} 第 ${value.weekIndex} 周`}
      </div>
      <div className="text-base">
        <Today value={value} />
        <Holiday value={value} />
      </div>
    </div>
  );
});
