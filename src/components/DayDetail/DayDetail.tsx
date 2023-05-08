import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { DateCell } from "../../calendar/calendar";
import { diffToday } from "../../calendar/day";
import { diffHolidayByToday } from "../../calendar/holiday";

export default function DayDetail({
  day,
  onClose,
}: {
  day: DateCell | null;
  onClose: () => void;
}) {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={!!day}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                  <div className="flex h-full shrink-0 items-center justify-center">
                    <CalendarDaysIcon
                      className="h-6 w-6 text-gray-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {`${day?.year}年${day?.month}月${day?.date}日 `}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {day && <DiffToday value={day} />}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {day && <Holiday value={day} />}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={onClose}
                >
                  关闭
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

function Holiday({ value }: { value: DateCell }) {
  if (!value.holiday) {
    return null;
  }

  if (value.holiday.isOffDay) {
    return (
      <div data-testid="calender-day-pop-holiday">
        {value.holiday.name} 假期第 {value.holiday.index + 1} 天
        <span className="mx-0.5">/</span>共 {value.holiday.total} 天
      </div>
    );
  }

  if (!value.holiday.isOffDay) {
    return (
      <div data-testid="calender-day-pop-holiday">
        {value.holiday.name} 补班第 {value.holiday.index + 1} 天
        <span className="mx-0.5">/</span>共 {value.holiday.total} 天
      </div>
    );
  }
  return null;
}

function DiffToday({ value }: { value: DateCell }) {
  let label = "今天";
  if (!value.isToday) {
    const day = diffToday(value.d);
    const holiday = diffHolidayByToday(value.d);
    label = day > 0 ? `距今 ${day} 天后` : `距今 ${0 - day} 天前`;
    label += holiday ? `, 共 ${holiday} 天假期` : "";
  }

  return <div data-testid="calender-day-pop-today">{label}</div>;
}
