import React from "react";
import { Search } from "react-feather";

const SecondHeader = () => {
  return (
    <div className="flex flex-col w-full bg-white  ">

<div className="p-3 flex justify-between items-center w-full bg-opacity-50 border-b-2">
  <h2 className="text font-semibold text-xl" style={{ color: "#00585E" }}>
    Dia Mês
  </h2>
  <div className="relative flex items-center">
    <input
      type="search"
      placeholder="Buscar"
      className="h-10 pl-10 pr-5 rounded-md text-sm focus:outline-none"
      style={{ border: "1px solid #00585E" }}
    />
    <div className="absolute left-3">
      <Search size={18} />
    </div>
  </div>
</div>

    </div>
  );
};

export default SecondHeader;
