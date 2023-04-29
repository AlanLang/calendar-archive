import { diffHoliday } from "./holiday";

describe("holiday", () => {
  it("should have 6 holidays", () => {
    const start = new Date(2023, 3, 27);
    const end = new Date(2023, 4, 8);
    expect(diffHoliday(start, end)).toEqual(6);
  });
  it("should have 10 holidays", () => {
    const start = new Date(2023, 3, 27);
    const end = new Date(2023, 4, 27);
    expect(diffHoliday(start, end)).toEqual(10);
  });
  it("should have 0 holiday", () => {
    const start = new Date(2023, 3, 28);
    const end = new Date(2023, 3, 29);
    expect(diffHoliday(start, end)).toEqual(0);
  });
  it("should have 1 holiday", () => {
    const start = new Date(2023, 4, 3);
    const end = new Date(2023, 4, 4);
    expect(diffHoliday(start, end)).toEqual(1);
  });
});
