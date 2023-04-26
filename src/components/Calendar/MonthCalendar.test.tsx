import { render, screen } from "@testing-library/react";
import { MonthCalendar } from "./MonthCalendar";
import { calendar } from "../../calendar";
import "@testing-library/jest-dom/extend-expect";
describe("MonthCalendar view", () => {
  it("should render", () => {
    const result = calendar.getMonthCalendar(2023, 4);
    render(<MonthCalendar data={result} />);
    expect(screen.getByTestId("mouth-name")).toBeInTheDocument();
    expect(screen.getByTestId("2023-04-25")).toBeInTheDocument();
  });

  it("should render month name", () => {
    const result = calendar.getMonthCalendar(2023, 4);
    render(<MonthCalendar data={result} />);
    expect(screen.getByTestId("mouth-name-month")).toHaveTextContent("4 月");
    expect(screen.getByTestId("mouth-name-year")).toHaveTextContent("2023");
  });
});
