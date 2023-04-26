import { DateCell } from "../../calendar/calendar";

export function Calendar({ data }: { data: DateCell[][] }) {
  return (
    <div>
      {data.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <div
              className="text-slate-300 font-black"
              data-testid={`${cell.year}-${cell.month
                .toString()
                .padStart(2, "0")}-${cell.date}`}
              key={j}
            >
              {cell.date}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
