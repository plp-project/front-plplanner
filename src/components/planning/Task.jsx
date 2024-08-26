import React from "react";
import { Edit2 } from "react-feather";
import NewTask from "./NewTask";

const Task = () => {
  return (
    <div className="flex flex-col gap-3">
    <div
      className="flex justify-between items-center bg-white p-1 cursor-pointer rounded-lg  hover:border-gray-500"
      style={{boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)`}}
    >
      <span>Nome da task</span>
      <span>
        <button className="hover:bg-gray-600 p-1 rounded-sm">
          {" "}
          <Edit2 size={16}></Edit2>
        </button>
      </span>
    </div>
    <NewTask></NewTask>
    </div>
  );
};

export default Task;
