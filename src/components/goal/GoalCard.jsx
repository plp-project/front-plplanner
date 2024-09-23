import React from "react";
import { Trash2 } from "react-feather";
import "./goalCard.css";

const GoalCard = ({ goal, onClick, onDelete }) => {
  return (
    <div className={`goal-card`} onClick={onClick}>
      <div className="goal-category" style={{ backgroundColor: goal.categoryColor }} />
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="delete-goal"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default GoalCard;
