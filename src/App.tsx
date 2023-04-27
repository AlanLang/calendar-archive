import { useCallback, useEffect, useState } from "react";
import { getMonthCalder } from "./calendar";
import { MonthCalendar } from "./components/Calendar";
import { DateCell, now } from "./calendar/calendar";

export function App() {
  const [year] = useState<number>(now.getFullYear());
  const [monthData, setMonthData] = useState<DateCell[][][]>([]);

  const getMonthCalderData = useCallback(() => {
    const data: DateCell[][][] = [];
    [...Array(12).keys()].forEach((item) => {
      data.push(getMonthCalder(year, item + 1));
    });
    return data;
  }, [year]);

  useEffect(() => {
    setMonthData(getMonthCalderData());
  }, [getMonthCalderData]);

  return (
    <div className="w-10/12">
      <div>
        <div className="h-16 w-64 bg-primary-700 text-secondary-100 font-black flex items-center justify-center">
          CALENDAR
        </div>
      </div>
      <h1 className="font-black text-4xl my-10 text-secondary-600">
        <label className="border-b border-b-secondary-700 border-dashed cursor-pointer">
          {year}
        </label>{" "}
        年日历及节假日
      </h1>
      <div className="grid calender-content">
        {monthData.map((item) => {
          return (
            <div>
              <MonthCalendar data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
