import { diffDay, diffToday } from "./day";

describe("diffDay", () => {
  it("should return the difference in days between two dates", () => {
    const date1 = new Date(2022, 1, 1); // February 1, 2022
    const date2 = new Date(2022, 0, 1); // January 1, 2022
    expect(diffDay(date1, date2)).toEqual(-31);
  });

  it("should handle negative differences correctly", () => {
    const date1 = new Date(2022, 0, 1); // January 1, 2022
    const date2 = new Date(2022, 1, 1); // February 1, 2022
    expect(diffDay(date1, date2)).toEqual(31);
  });

  it("should handle identical dates correctly", () => {
    const date1 = new Date(2022, 0, 1); // January 1, 2022
    const date2 = new Date(2022, 0, 1); // January 1, 2022
    expect(diffDay(date1, date2)).toEqual(0);
  });

  it("Should calculate the difference in days between two dates.", () => {
    const date1 = new Date(2023, 2, 3);
    const date2 = new Date(2023, 3, 28);
    expect(diffDay(date1, date2)).toEqual(56);
  });

  it("should have 1 day", () => {
    const start = new Date(2023, 3, 28);
    const end = new Date(2023, 3, 29);
    expect(diffDay(start, end)).toEqual(1);
  });
});

describe("diffToday", () => {
  it("Should calculate the difference in day between today", () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 2, 3));
    const date2 = new Date(2023, 3, 28);
    expect(diffToday(date2)).toEqual(56);
  });
});
