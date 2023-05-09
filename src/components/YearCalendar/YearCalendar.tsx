import { DateCell } from "../../calendar/calendar";
import classNames from "classnames";
import { Mark } from "../DayDetail/DayDetail";

export interface YearCalendarProps {
  data: {
    name: string;
    days: DateCell[];
  }[];
  onClick?: (date: DateCell) => void;
  selected?: DateCell | null;
  marks: Mark[];
}

export default function YearCalendar({
  data,
  onClick,
  selected,
  marks,
}: YearCalendarProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        {data.map((month) => (
          <section key={month.name} className="text-center">
            <h2 className="text-sm font-semibold text-gray-900">
              {month.name}
            </h2>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div>六</div>
              <div>日</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {month.days.map((day, dayIdx) => (
                <button
                  key={day.dateStr}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white text-gray-900"
                      : "bg-gray-50 text-gray-400",
                    dayIdx === 0 && "rounded-tl-lg",
                    dayIdx === 6 && "rounded-tr-lg",
                    dayIdx === month.days.length - 7 && "rounded-bl-lg",
                    dayIdx === month.days.length - 1 && "rounded-br-lg",
                    "py-1.5 hover:bg-gray-100 focus:z-10 relative"
                  )}
                  onClick={() => {
                    day.isCurrentMonth && onClick?.(day);
                  }}
                >
                  <time
                    dateTime={day.dateStr}
                    className={classNames(
                      day.isToday && "bg-indigo-600 font-semibold text-white",
                      {
                        "bg-gray-600 font-semibold text-white":
                          selected &&
                          day.isCurrentMonth &&
                          selected.dateStr === day.dateStr,
                      },
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                    )}
                  >
                    {day.date}
                  </time>
                  <div className="flex h-2 items-center justify-center">
                    {day.isCurrentMonth && day.holiday && (
                      <div
                        className={classNames(
                          "inline-block h-1.5 w-1.5 rounded-full ",
                          { "bg-cyan-400": day.holiday.isOffDay },
                          { "bg-gray-400": !day.holiday.isOffDay }
                        )}
                      />
                    )}
                    {day.isCurrentMonth &&
                      marks
                        .filter((item) => item.date.dateStr === day.dateStr)
                        .map((item) => (
                          <div
                            key={item.name}
                            className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"
                          ></div>
                        ))}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
