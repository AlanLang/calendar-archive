import { calendar } from "./calendar";

describe("Generate calendar data", () => {
  it("should generate month calendar data", () => {
    expect(calendar).toBeDefined();
    const result = calendar.getMonthCalendar(2023, 4);
    expect(result.length).toBe(6);
    expect(result[0].length).toBe(7);
    expect(result[0][0]).toStrictEqual({
      date: 26,
      isCurrentMonth: false,
      isNextMonth: false,
      isPrevMonth: true,
      isToday: false,
      month: 3,
      year: 2023,
      ctx: {
        year: 2023,
        month: 4,
        cell: expect.any(Function),
      },
    });
  });
});
