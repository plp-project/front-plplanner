import React, { useState } from "react";
import SecondHeader from "./SecondHeader";
import Quadro from "./Quadro";

const Main = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="flex flex-col w-full bg-white">
      <SecondHeader
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
      <Quadro month={month} year={year} />
    </div>
  );
};

export default Main;
