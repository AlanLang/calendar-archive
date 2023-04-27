import { DateCell } from "../../calendar/calendar";
import Trigger from "rc-trigger";
import { CalenderDayPop } from "./CalenderDayPop";
import { WEEK_NAMES } from "./constant";

function MonthName({ month, year }: { month: number; year: number }) {
  return (
    <div
      data-testid="mouth-name"
      className="text-lg border-b border-b-secondary-500"
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
    <div className="w-full h-full p-0.5 flex justify-center items-center">
      <Trigger
        action={["click"]}
        destroyPopupOnHide={true}
        mouseEnterDelay={0.5}
        popup={<CalenderDayPop value={value}></CalenderDayPop>}
        popupAlign={{
          points: ["tl", "bl"],
          offset: [0, 3],
        }}
      >
        <div className={classNames.join(" ")}>{value.date}</div>
      </Trigger>
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
      <table className="text-xs w-full">
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
                  className="justify-center items-center text-secondary-500"
                  key={j}
                >
                  <div className="w-full inline-flex justify-center items-center aspect-square">
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
