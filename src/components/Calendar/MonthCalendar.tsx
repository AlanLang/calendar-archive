import { DateCell } from "../../calendar/calendar";
import { WEEK_NAMES } from "./constant";

function MonthName({ month, year }: { month: number; year: number }) {
  return (
    <div
      data-testid="mouth-name"
      className="border-b border-b-secondary-500 text-lg"
    >
      <label data-testid="mouth-name-month" className="font-black">
        {month}月
      </label>
      <label data-testid="mouth-name-year" className="mx-2">
        {year}
      </label>
    </div>
  );
}

export function DayCell({ value }: { value: DateCell }) {
  if (!value.isCurrentMonth) {
    return null;
  }

  const classNames: string[] = [
    "flex justify-center items-center h-full w-full cursor-pointer",
  ];
  if (value.isToday) {
    classNames.push(
      "border-3 border-solid border-primary-700 rounded-full hover:border-secondary-700"
    );
  } else if (value.holiday && value.holiday.isOffDay) {
    classNames.push(
      "bg-primary-700 text-white hover:border hover:border-white-500"
    );
  } else if (value.holiday && !value.holiday.isOffDay) {
    classNames.push(
      "bg-secondary-600 text-white hover:border hover:border-white-500"
    );
  } else {
    classNames.push("hover:border hover:border-secondary-500");
  }

  if (value.week === 0 || value.week === 6) {
    classNames.push("text-primary-700 font-bold");
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-0.5">
      <div
        data-calender-day={`${value.month - 1}-${value.position.join("-")}`}
        className={classNames.join(" ")}
      >
        {value.date}
      </div>
    </div>
  );
}

export function WeekIndex({ value }: { value: DateCell }) {
  if (!value.isCurrentMonth) {
    return null;
  }
  return <div className="text-secondary-400">{value.weekIndex}</div>;
}

export function MonthCalendar({
  data,
  className,
}: {
  data: DateCell[][];
  className?: string;
}) {
  const firstData = data[0][0];
  const dataWithWeek = data.map((row) => [
    row.find((item) => item.isCurrentMonth),
    ...row,
  ]);
  return (
    <div className={className}>
      <MonthName month={firstData.ctx.month} year={firstData.ctx.year} />
      <table className="w-full text-xs">
        <thead>
          <tr>
            {["", ...WEEK_NAMES].map((name, i) => (
              <th className="text-center font-normal" key={i}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataWithWeek.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  style={{ width: j === 0 ? "6.2%" : "13.4%" }}
                  className="items-center justify-center text-secondary-500"
                  key={j}
                >
                  <div className="inline-flex aspect-square w-full items-center justify-center">
                    {cell ? (
                      j === 0 ? (
                        <WeekIndex value={cell} />
                      ) : (
                        <DayCell value={cell} />
                      )
                    ) : null}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
