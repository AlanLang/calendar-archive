import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getMonthCalder } from "./calendar";
import { DateCell, now } from "./calendar/calendar";
import { CalenderDayDetail } from "./components/Calendar/CalenderDayDetail";
import { useHover } from "./hooks/useHover";
import { MonthCalendar } from "./components/Calendar";
import { isMobileDevice } from "./utils/isMobileDevice";
import { Mark } from "./components/Calendar/MonthCalendar";

const OPO_OFFSET = 20;
const COLORS = ["orange", "green", "cyan", "blue", "purple"];
const CALENDAR_CONFIG = "CALENDAR_CONFIG";

function isHoverCalenderDay(e: MouseEvent) {
  const { dataset } = e.target as HTMLElement;
  return dataset && "calenderDay" in dataset;
}

export function App() {
  const config = localStorage.getItem(CALENDAR_CONFIG);
  const defaultMarks = config ? JSON.parse(config).marks : [];
  const [year] = useState<number>(now.getFullYear());
  const [monthData, setMonthData] = useState<DateCell[][][]>([]);
  const [marks, setMarks] = useState<Mark[]>(defaultMarks);
  const { ref, hoverEventState, transitionString } = useHover({
    isHover: isHoverCalenderDay,
  });

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

  const saveMarks = (value: Mark[]) => {
    setMarks(value);
    localStorage.setItem(CALENDAR_CONFIG, JSON.stringify({ marks: value }));
  };

  const hoverPosition = useMemo(() => {
    if (!hoverEventState) return null;
    const { dataset } = hoverEventState.target as HTMLElement;
    const isHoverCalenderDay = dataset && "calenderDay" in dataset;
    if (isHoverCalenderDay) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

  const dayPropClassName = `detail-day-${transitionString}`;
  return (
    <div className="w-10/12">
      <Logo />
      <CalendarHeader year={year} />
      <div ref={ref} className="calender-content grid">
        <CalendarYear
          value={monthData}
          marks={marks}
          onMarksSelect={(value) => {
            if (marks.some((item) => item.date.dateStr === value.dateStr)) {
              saveMarks(
                marks.filter((item) => item.date.dateStr !== value.dateStr)
              );
            } else {
              saveMarks([
                ...marks,
                {
                  date: value,
                  name: value.dateStr,
                  color: COLORS[Math.floor(Math.random() * COLORS.length)],
                },
              ]);
            }
          }}
        />
      </div>
      <CalenderDayPopup
        value={hoverPositionValue}
        marks={marks}
        position={hoverPosition ? [hoverPosition[3], hoverPosition[4]] : [0, 0]}
        className={dayPropClassName}
      />
    </div>
  );
}

const Logo = memo(() => {
  return (
    <div className="flex h-16 w-64 items-center justify-center bg-primary-700 font-black text-secondary-100">
      CALENDAR
    </div>
  );
});

const CalendarHeader = memo(({ year }: { year: number }) => {
  return (
    <h1 className="my-10 text-4xl font-black text-secondary-600">
      <label className="mx-1 cursor-pointer border-b border-dashed border-b-secondary-700">
        {year}
      </label>
      年日历<label className="hidden tablet:inline">及节假日</label>
    </h1>
  );
});

const CalendarYear = memo(
  ({
    value,
    marks,
    onMarksSelect,
  }: {
    value: DateCell[][][];
    marks: Mark[];
    onMarksSelect?: (date: DateCell) => void;
  }) => {
    return (
      <>
        {value.map((item, i) => {
          return (
            <div key={i}>
              <MonthCalendar
                data={item}
                marks={marks}
                onMarksSelect={onMarksSelect}
              />
            </div>
          );
        })}
      </>
    );
  }
);

const POP_WIDTH = 400;

function CalenderDayPopup({
  value,
  position,
  className,
  marks,
}: {
  value: DateCell | null;
  position: [number, number];
  className: string;
  marks: Mark[];
}) {
  if (!value) {
    return null;
  }
  if (isMobileDevice()) {
    return (
      <div className="fixed inset-x-0 bottom-0">
        <CalenderDayDetail value={value} marks={marks} />
        <div className="absolute right-2 top-2 bg-secondary-700 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`fixed left-0 top-0 ${className}`}
      style={{
        transform: `translate(${position[0]}px, ${position[1]}px)`,
        width: POP_WIDTH,
      }}
    >
      <CalenderDayDetail value={value} marks={marks} />
    </div>
  );
}
