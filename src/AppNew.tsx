import { useCallback, useEffect, useState } from "react";
import YearCalendar, {
  YearCalendarProps,
} from "./components/YearCalendar/YearCalendar";
import { getMonthCalder, now } from "./calendar";
import { YearHeader } from "./components/YearCalendar/Header";
import DayDetail from "./components/DayDetail/DayDetail";
import { DateCell } from "./calendar/calendar";

export function App() {
  const [data, setData] = useState<YearCalendarProps["data"]>([]);
  const [year, setYear] = useState<number>(now.getFullYear());
  const [selected, setSelected] = useState<DateCell | null>(null);

  const getMonthCalderData = useCallback(() => {
    const data: YearCalendarProps["data"] = [];
    [...Array(12).keys()].forEach((item) => {
      data.push({
        name: `${item + 1}月`,
        days: getMonthCalder(year, item + 1).flat(),
      });
    });
    return data;
  }, [year]);

  useEffect(() => {
    setData(getMonthCalderData());
  }, [getMonthCalderData]);

  return (
    <div>
      <YearHeader
        value={year}
        onChange={(value) => {
          setYear(value);
        }}
      ></YearHeader>
      <YearCalendar
        data={data}
        onClick={(value) => {
          setSelected(value);
        }}
      ></YearCalendar>
      <DayDetail
        day={selected}
        onClose={() => {
          setSelected(null);
        }}
      />
    </div>
  );
}
