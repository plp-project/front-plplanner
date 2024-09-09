import React from "react";
import Planejamento from "./Planejamento";

const Quadro = ({ month, year }) => {
  return (
    <div className="flex flex-col w-full flex-grow relative">
      <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
        <Planejamento month={month} year={year} />
      </div>
    </div>
  );
};

export default Quadro;
