import { getMonthCalder } from "./calendar";
import { MonthCalendar } from "./components/Calendar";

const result = getMonthCalder(2023, 4);

export function App() {
  return (
    <div style={{ width: 250, height: 313 }}>
      <MonthCalendar data={result} />
    </div>
  );
}
