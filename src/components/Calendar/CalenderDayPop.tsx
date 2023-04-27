import { DateCell } from "../../calendar/calendar";
import { WEEK_NAMES } from "./constant";

export function CalenderDayPop({ value }: { value: DateCell }) {
  const weekIndex = value.week === 0 ? 6 : value.week - 1;
  return (
    <div className="bg-secondary-800 text-white inline-flex flex-col text-xl py-5 px-10 opacity-95">
      <div>
        {`${value.year}年${value.month}月${value.date}日 星期${WEEK_NAMES[weekIndex]}`}
      </div>
    </div>
  );
}
