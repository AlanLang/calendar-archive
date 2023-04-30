import { memo } from "react";
import { DateCell } from "../../calendar/calendar";
import { diffDay, diffToday } from "../../calendar/day";
import { diffHoliday, diffHolidayByToday } from "../../calendar/holiday";
import { WEEK_NAMES } from "./constant";
import { Mark } from "./MonthCalendar";

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
      <div data-testid="calender-day-pop-holiday">
        {value.holiday.name} 假期 {value.holiday.index + 1}
        <span className="mx-0.5">/</span>
        {value.holiday.total}
      </div>
    );
  }

  if (!value.holiday.isOffDay) {
    return (
      <div data-testid="calender-day-pop-holiday">
        {value.holiday.name} 补班 {value.holiday.index + 1}
        <span className="mx-0.5">/</span>
        {value.holiday.total}
      </div>
    );
  }
  return null;
}

function MarksDetail({
  value,
  marks = [],
}: {
  value: DateCell;
  marks?: Mark[];
}) {
  return (
    <div data-testid="calender-day-pop-masks">
      {marks.map((item) => {
        return <MarkDetail key={item.name} value={value} mark={item} />;
      })}
    </div>
  );
}

function MarkDetail({ value, mark }: { value: DateCell; mark: Mark }) {
  const dayNum = diffDay(mark.date.d, value.d);
  const holiday = diffHoliday(mark.date.d, value.d);
  if (dayNum === 0) {
    return <div>{mark.name}</div>;
  }
  return (
    <div>
      距离<label className="mx-0.5">{mark.name}</label>
      <label className="mx-0.5">{Math.abs(dayNum)}</label>
      <label className="mx-0.5">天{dayNum > 0 ? "后" : "前"}</label>
      <label className="mx-0.5">
        共<label className="mx-0.5">{holiday}</label>天假期
      </label>
    </div>
  );
}

export const CalenderDayDetail = memo(
  ({ value, marks }: { value: DateCell; marks?: Mark[] }) => {
    const weekIndex = value.week === 0 ? 6 : value.week - 1;
    return (
      <div className="inline-flex w-full flex-col bg-secondary-800 px-10 py-5 text-xl text-white opacity-95">
        <div data-testid="calender-day-pop-title">
          {`${value.year}年${value.month}月${value.date}日 星期${WEEK_NAMES[weekIndex]} 第 ${value.weekIndex} 周`}
        </div>
        <div className="text-base">
          <Today value={value} />
          <Holiday value={value} />
          <MarksDetail value={value} marks={marks} />
        </div>
      </div>
    );
  }
);
