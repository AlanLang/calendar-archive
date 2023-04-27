import { render, screen } from "@testing-library/react";
import { MonthCalendar } from "./MonthCalendar";
import "@testing-library/jest-dom/extend-expect";
import { getMonthCalder } from "../../calendar";
describe("MonthCalendar view", () => {
  it("should render", () => {
    const result = getMonthCalder(2023, 4);
    render(<MonthCalendar data={result} />);
    expect(screen.getByTestId("mouth-name")).toBeInTheDocument();
  });

  it("should render month name", () => {
    const result = getMonthCalder(2023, 4);
    render(<MonthCalendar data={result} />);
    expect(screen.getByTestId("mouth-name-month")).toHaveTextContent("4月");
    expect(screen.getByTestId("mouth-name-year")).toHaveTextContent("2023");
  });

  it("should be red border when today", () => {
    const today = new Date();
    const result = getMonthCalder(2023, 4);
    render(<MonthCalendar data={result} />);
    expect(screen.getByText(today.getDate())).toHaveClass(
      "border-3 border-solid border-primary-700 rounded-full h-9 w-9 flex justify-center items-center"
    );
  });
});
