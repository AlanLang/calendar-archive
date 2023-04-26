import { render, screen } from "@testing-library/react";
import { Calendar } from "./calendar";
import { calendar } from "../../calendar";
describe("Calder view", () => {
  it("should render", () => {
    const result = calendar.getMonthCalendar(2023, 4);
    render(<Calendar data={result} />);
    screen.getByTestId("2023-04-25");
  });
});
