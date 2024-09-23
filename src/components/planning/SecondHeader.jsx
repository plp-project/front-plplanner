import React from "react";
import { Search } from "react-feather";

const SecondHeader = ({ month, year, setMonth, setYear }) => {
  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };
  return (
    <div className="p-3 flex justify-between h-[75px] items-center w-full bg-opacity-50 border-b-2">
      <div className="flex space-x-2">
        <select
          value={month}
          onChange={handleMonthChange}
          className="text font-semibold text-xl"
          style={{ color: "#00585E" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={handleYearChange}
          className="text font-semibold text-xl"
          style={{ color: "#00585E" }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SecondHeader;
