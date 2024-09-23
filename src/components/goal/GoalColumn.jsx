import React from "react";
import GoalCard from "./GoalCard";
import { Plus } from "react-feather";

const GoalColumn = ({ title, duration, goals, onEdit, onDelete, onAddGoal }) => {
  return (
    <div className="goal-column bg-gray-100 flex flex-col h-fit text-gray-800 font-semibold shadow-md p-4 rounded-sm">
      <span className="font-bold text-base">{title}</span>
      <div className="flex flex-col max-h-[64vh] gap-3 quadro-scroll overflow-auto mt-2">
        {goals
          .filter((goal) => goal.duration === duration)
          .map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={onEdit} onDelete={() => onDelete(goal.id)} />
          ))}
      </div>
      <button onClick={onAddGoal} className="btn-add-goal">
        <Plus size={16} />
        <span>Nova Meta</span>
      </button>
    </div>
  );
};

export default GoalColumn;
