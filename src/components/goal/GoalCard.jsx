import React from "react";
import { Edit, Trash2 } from "react-feather";
import "./goalCard.css";

const GoalCard = ({ goal, onEdit, onDelete }) => {
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

  const { label, className, width } = statusMapping[goal.status] || statusMapping.todo;

  return (
    <div className="goal-card">
      <div className="goal-category" style={{ backgroundColor: goal.categoryColor }} />
      <div className="flex justify-between items-center">
        <h3>{goal.name}</h3>
        <div className="flex align-middle gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(goal);
            }}
            className="hover:bg-gray-300 p-1 rounded-sm mt-0"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="hover:bg-gray-300 p-1 rounded-sm mt-0"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={`status-box ${className} ${width} p-1 rounded-md mt-2 text-center`}>
        {label}
      </div>
    </div>
  );
};

export default GoalCard;
