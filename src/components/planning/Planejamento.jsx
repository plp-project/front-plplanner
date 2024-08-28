import React from "react";
import Task from "./Task";

const Planejamento = () => {
  return (
    <div>
      <div
        className="mr-3 w-60 h-fit p-2 flex-shrink-0"
        style={{
          background: `#F3F5F6`,
          color: "#313131",
          fontFamily: `Open sans`,
          fontWeight: `600`,
          boxShadow: `0px 4px 4px 0px rgba(0, 0, 0, 0.25)`, 
          
        }}
      >
        <div className="list-body flex flex-col gap-2">
          <div className="flex justify-between p-1">
            <span>01/07- Segunda-feira</span>
          </div>
          <Task></Task>
        </div>
      </div>
    </div>
  );
};

export default Planejamento;
