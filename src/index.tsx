import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import { calendar } from "./calendar/calendar";
import { MonthCalendar } from "./components/Calendar";
import "./index.css";
const result = calendar.getMonthCalendar(2023, 4);
function App() {
  useEffect(() => {
    const result = calendar.getMonthCalendar(2023, 4);
    console.log(result);
  }, []);
  return (
    <div style={{ width: 250, height: 313 }}>
      <MonthCalendar data={result} />
    </div>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
