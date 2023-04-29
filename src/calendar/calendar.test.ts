import { calendar, getMonthCalder, getWeekNumber } from "./calendar";

describe("Generate calendar data", () => {
  it("should generate month calendar data", () => {
    expect(calendar).toBeDefined();
    const result = getMonthCalder(2023, 4);
    expect(result.length).toBe(6);
    expect(result[0].length).toBe(7);
    expect(result[0][0]).toStrictEqual({
      date: 27,
      isCurrentMonth: false,
      isNextMonth: false,
      isPrevMonth: true,
      isToday: false,
      month: 3,
      year: 2023,
      week: 1,
      weekIndex: 13,
      d: new Date(2023, 2, 27),
      dateStr: "2023-03-27",
      position: [0, 0],
      ctx: {
        year: 2023,
        month: 4,
        cell: expect.any(Function),
      },
    });
  });

  it("should generate holiday data", () => {
    const result = getMonthCalder(2023, 5);
    expect(result[0][0].holiday).toStrictEqual({
      date: "2023-05-01",
      name: "劳动节",
      index: 2,
      total: 5,
      isOffDay: true,
    });
  });
});

describe("should generate week number", () => {
  test("Should return 1 for January 1st, 2024", () => {
    const date = new Date("2024-01-01");
    expect(getWeekNumber(date)).toBe(1);
  });

  test("Should return 17 for April 27th, 2023", () => {
    const date = new Date("2023-04-27");
    expect(getWeekNumber(date)).toBe(17);
  });
});
