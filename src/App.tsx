import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMonthCalder } from "./calendar";
import { MonthCalendar } from "./components/Calendar";
import { DateCell, now } from "./calendar/calendar";
import { CalenderDayPop } from "./components/Calendar/CalenderDayPop";

export function App() {
  const [year] = useState<number>(now.getFullYear());
  const [monthData, setMonthData] = useState<DateCell[][][]>([]);
  const [hoverPosition, setHoverPosition] = useState<
    [number, number, number, number, number] | null
  >(null);
  const hoverTimeoutId = useRef<number | null>(null);

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

  const handleMouseClick = useCallback((e: MouseEvent) => {
    const isHoverCalenderDay = "calenderDay" in (e.target as any).dataset;
    if (isHoverCalenderDay) {
      hoverTimeoutId.current && clearTimeout(hoverTimeoutId.current);
      const data = (e.target as any).dataset.calenderDay.split("-");
      setHoverPosition([...data, e.clientX + 30, e.clientY + 30] as any);
    } else {
      hoverTimeoutId.current && clearTimeout(hoverTimeoutId.current);
      hoverTimeoutId.current = window.setTimeout(() => {
        setHoverPosition(null);
      }, 500);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleMouseClick);
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  });

  const hoverPositionValue = useMemo(() => {
    if (!hoverPosition) return null;
    return monthData[hoverPosition[0]][hoverPosition[1]][hoverPosition[2]];
  }, [monthData, hoverPosition]);

  return (
    <div className="w-10/12">
      <div>
        <div className="h-16 w-64 bg-primary-700 text-secondary-100 font-black flex items-center justify-center">
          CALENDAR
        </div>
      </div>
      <h1 className="font-black text-4xl my-10 text-secondary-600">
        <label className="border-b border-b-secondary-700 border-dashed cursor-pointer mx-1">
          {year}
        </label>
        年日历<label className="hidden tablet:inline">及节假日</label>
      </h1>
      <div
        className="grid calender-content"
        onMouseLeave={() => {
          setHoverPosition(null);
        }}
      >
        {monthData.map((item, i) => {
          return (
            <div key={i}>
              <MonthCalendar data={item} />
            </div>
          );
        })}
      </div>
      {hoverPositionValue && (
        <div
          className="fixed top-0 left-0 animate-fade-in"
          style={{
            transform: `translate(${hoverPosition![3]}px, ${
              hoverPosition![4]
            }px)`,
          }}
        >
          <CalenderDayPop value={hoverPositionValue} />
        </div>
      )}
    </div>
  );
}
