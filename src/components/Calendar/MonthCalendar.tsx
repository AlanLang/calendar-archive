import { DateCell } from "../../calendar/calendar";

function MonthName({ month, year }: { month: number; year: number }) {
  return (
    <div
      data-testid="mouth-name"
      className="text-lg border-b border-slate-400 py-0.5"
    >
      <label data-testid="mouth-name-month" className="font-black">
        {month} 月
      </label>
      <label data-testid="mouth-name-year" className="mx-2">
        {year}
      </label>
    </div>
  );
}

export function MonthCalendar({
  data,
  className,
}: {
  data: DateCell[][];
  className?: string;
}) {
  const firstData = data[0][0];
  return (
    <div className={className}>
      <MonthName month={firstData.ctx.month} year={firstData.ctx.year} />
      <table className="w-full">
        <thead></thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  className="text-slate-300 font-black"
                  data-testid={`${cell.year}-${cell.month
                    .toString()
                    .padStart(2, "0")}-${cell.date}`}
                  key={j}
                >
                  {cell.date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
