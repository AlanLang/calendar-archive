import { MinusIcon } from "@heroicons/react/20/solid";
import { Mark } from "../DayDetail/DayDetail";
import { useState } from "react";
import classNames from "classnames";
import { DateCell } from "../../calendar/calendar";

export default function MarkEdit({
  value,
  date,
  onChange,
}: {
  value: Mark[];
  date: DateCell;
  onChange: (value: Mark[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const enableSubmit =
    inputValue !== "" && !value.some((item) => item.name === inputValue);

  const handleMinusIconClick = (name: string) => {
    onChange(value.filter((item) => item.name !== name));
  };

  const handleSubmit = () => {
    onChange([
      ...value,
      {
        name: inputValue,
        date,
        color: "red",
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="mx-auto max-w-lg">
      <div>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-3 text-base font-semibold leading-6 text-gray-900">
            添加标记
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            可以给当前日期添加一些标记，方便计算日期之间的间隔
          </p>
        </div>
        <div className="mt-6 flex">
          <label htmlFor="markName" className="sr-only">
            请输入标记名称
          </label>
          <input
            id="markName"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入标记名称"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.trim());
            }}
          />
          <button
            type="submit"
            disabled={!enableSubmit}
            onClick={handleSubmit}
            className={classNames(
              "disabled:opacity-50 ml-4 shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            )}
          >
            添加
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">
          当前已经添加的标记
        </h3>
        <ul
          role="list"
          className="mt-4 divide-y divide-gray-200 border-y border-gray-200"
        >
          {value.map((item, personIdx) => (
            <li
              key={personIdx}
              className="flex items-center justify-between space-x-3 py-4"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="shrink-0">LOGO</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500">
                    {item.color}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                >
                  <MinusIcon
                    className="mr-2 h-5 w-5 text-gray-400 hover:bg-gray-200"
                    aria-hidden="true"
                    onClick={() => {
                      handleMinusIconClick(item.name);
                    }}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
