import { useCallback, useEffect, useState } from "react";
import YearCalendar, {
  YearCalendarProps,
} from "./components/YearCalendar/YearCalendar";
import { getMonthCalder, now } from "./calendar";
import { YearHeader } from "./components/YearCalendar/Header";
import DayDetail, { Mark } from "./components/DayDetail/DayDetail";
import { DateCell } from "./calendar/calendar";
import MarkEditModal from "./components/MarkEditModal/MarkEditModal";

const CALENDAR_CONFIG = "CALENDAR_CONFIG";

export function App() {
  const [data, setData] = useState<YearCalendarProps["data"]>([]);
  const [year, setYear] = useState<number>(now.getFullYear());
  const [selected, setSelected] = useState<DateCell | null>(null);
  const config = localStorage.getItem(CALENDAR_CONFIG);
  const defaultMarks = config ? JSON.parse(config).marks : [];
  const [marks, setMarks] = useState<Mark[]>(defaultMarks);
  const [markEditModalVisible, setMarkEditModalVisible] =
    useState<boolean>(false);

  const saveMarks = (value: Mark[]) => {
    setMarks(value);
    localStorage.setItem(CALENDAR_CONFIG, JSON.stringify({ marks: value }));
  };

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
        marks={marks}
        selected={selected}
        onClick={(value) => {
          if (value.dateStr === selected?.dateStr) {
            setSelected(null);
          } else {
            setSelected(value);
          }
        }}
      ></YearCalendar>
      <DayDetail
        marks={marks}
        day={selected}
        onClose={() => {
          setSelected(null);
        }}
        onMarkClick={() => {
          setMarkEditModalVisible(true);
        }}
      />
      {selected && (
        <MarkEditModal
          date={selected}
          value={marks.filter((item) => item.date.dateStr === selected.dateStr)}
          onChange={(value) => {
            saveMarks(
              marks
                .filter((item) => item.date.dateStr !== selected.dateStr)
                .concat(value)
            );
          }}
          open={markEditModalVisible}
          onClose={() => {
            setMarkEditModalVisible(false);
          }}
        />
      )}
    </div>
  );
}
