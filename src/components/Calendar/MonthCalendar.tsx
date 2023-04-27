import { DateCell } from "../../calendar/calendar";

const WEEK_NAMES = ["一", "二", "三", "四", "五", "六", "日"];

function MonthName({ month, year }: { month: number; year: number }) {
  return (
    <div
      data-testid="mouth-name"
      className="text-lg border-b border-b-secondary-500 "
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

  const classNames: string[] = [""];
  if (value.isToday) {
    classNames.push(
      "border-3 border-solid border-primary-700 rounded-full h-9 w-9 flex justify-center items-center"
    );
  }
  if (value.week === 0 || value.week === 6) {
    classNames.push("text-primary-700 font-bold");
  }

  return <div className={classNames.join(" ")}>{value.date}</div>;
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
