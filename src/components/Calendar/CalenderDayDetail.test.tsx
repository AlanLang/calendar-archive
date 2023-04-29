import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { CalenderDayDetail } from "./CalenderDayDetail";
import { getMonthCalder } from "../../calendar";
describe("CalenderDayDetail view", () => {
  it("should render", () => {
    const result = getMonthCalder(2023, 4);
    const date = result[0][1];

    render(<CalenderDayDetail value={date} />);
    expect(screen.getByTestId("calender-day-pop-title")).toBeInTheDocument();
    expect(screen.getByTestId("calender-day-pop-title")).toHaveTextContent(
      "2023年3月28日 星期二 第 13 周"
    );
  });

  it("should show diff message after today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 3, 28));
    const today = new Date();
    expect(today.getDate()).toBe(28);
    const result = getMonthCalder(2023, 5);
    const date = result[1][0];
    expect(date.dateStr).toBe("2023-05-08");
    render(<CalenderDayDetail value={date} />);
    expect(screen.getByTestId("calender-day-pop-today")).toBeInTheDocument();
    expect(screen.getByTestId("calender-day-pop-today")).toHaveTextContent(
      "距今 10 天后, 共 6 天假期"
    );
  });

  it("should show diff message before today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 4, 28));
    const result = getMonthCalder(2023, 5);
    const date = result[1][0];
    render(<CalenderDayDetail value={date} />);
    expect(screen.getByTestId("calender-day-pop-today")).toBeInTheDocument();
    expect(screen.getByTestId("calender-day-pop-today")).toHaveTextContent(
      "距今 20 天前, 共 5 天假期"
    );
  });
});
