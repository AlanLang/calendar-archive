import { useCallback, useEffect, useMemo, useState } from "react";
import { getMonthCalder } from "./calendar";
import { MonthCalendar } from "./components/Calendar";
import { DateCell, now } from "./calendar/calendar";
import {
  CalenderDayPop,
  POP_WIDTH,
} from "./components/Calendar/CalenderDayPop";
import { useHover } from "./hooks/useHoverEffect";

const OPO_OFFSET = 20;

function isHoverCalenderDay(e: MouseEvent) {
  const { dataset } = e.target as HTMLElement;
  return dataset && "calenderDay" in dataset;
}

export function App() {
  const [year] = useState<number>(now.getFullYear());
  const [monthData, setMonthData] = useState<DateCell[][][]>([]);
  const { ref, hoverEventState } = useHover({ isHover: isHoverCalenderDay });

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

  const hoverPosition = useMemo(() => {
    if (!hoverEventState) return null;
    const { dataset } = hoverEventState.target as HTMLElement;
    const isHoverCalenderDay = dataset && "calenderDay" in dataset;
    if (isHoverCalenderDay) {
      const data = dataset.calenderDay!.split("-");
      // 如果超出屏幕右侧，则显示在鼠标左侧
      let positionX = hoverEventState.clientX + OPO_OFFSET;
      if (positionX + POP_WIDTH > window.innerWidth) {
        positionX = hoverEventState.clientX - OPO_OFFSET - POP_WIDTH;
      }
      return [
        ...data,
        positionX,
        hoverEventState.clientY + OPO_OFFSET,
      ] as unknown as [number, number, number, number, number];
    }

    return null;
  }, [hoverEventState]);

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
      <div ref={ref} className="grid calender-content">
        {monthData.map((item, i) => {
          return (
            <div key={i}>
              <MonthCalendar data={item} />
            </div>
          );
        })}
      </div>
      {hoverPositionValue && hoverPosition && (
        <div
          className="fixed top-0 left-0 animate-fade-in"
          style={{
            transform: `translate(${hoverPosition[3]}px, ${hoverPosition[4]}px)`,
          }}
        >
          <CalenderDayPop value={hoverPositionValue} />
        </div>
      )}
      {monthData.length > 0 && <CalenderDayPop value={monthData[0][0][0]} />}
    </div>
  );
}
