import React, { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { useCategory } from "../../contexts/CategoryContext";
import "./goalCard.css";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const [isCategoryMinimized, setIsCategoryMinimized] = useState(true);
  const { categories } = useCategory();
  const category = categories.find((cat) => cat.id === goal.categoryId);

  const statusMapping = {
    success: {
      label: "Concluída",
      className: "bg-green-500 text-white",
      width: "w-20",
    },
    failed: {
      label: "Não Concluída",
      className: "bg-red-500 text-white",
      width: "w-28",
    },
    partially_success: {
      label: "Parcialmente",
      className: "bg-blue-500 text-white",
      width: "w-28",
    },
    todo: {
      label: "Pendente",
      className: "bg-yellow-500 text-white",
      width: "w-20",
    },
  };

  const { label, className, width } =
    statusMapping[goal.status] || statusMapping.todo;

  return (
    <div
      className="flex justify-between items-center px-4 py-2 my-1 bg-white rounded-lg"
      style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
    >
      <div className="flex flex-col my-1 gap-2 font-semibold break-all text-base">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsCategoryMinimized(!isCategoryMinimized);
          }}
          className="px-2 py-1 rounded-md cursor-pointer text-xs text-white"
          style={{
            backgroundColor: category ? category.color : "#ccc",
            width: isCategoryMinimized ? "40px" : "auto",
            height: "auto",
            display: "inline-block",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {!isCategoryMinimized && (category ? category.name : "Sem categoria")}
        </span>

        <h3>{goal.name}</h3>
        <div
          className={`status-box ${className} ${width} p-1 rounded-md mt-2 text-xs text-center w-auto`}
        >
          {label}
        </div>
      </div>
      <div className="flex gap-1 items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(goal);
          }}
          className="hover:bg-[#00585E] p-2 rounded-full hover:text-white"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="hover:bg-[#00585E] p-2 rounded-full hover:text-white"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
