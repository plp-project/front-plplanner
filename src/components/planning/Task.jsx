import React, { useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { useCategory } from "../../contexts/CategoryContext";

const Task = ({ task, day, month, year }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editName, setEditName] = useState("");
  const { removeTask, updateTask } = useTask();
  const { categories } = useCategory(); // Pega as categorias disponíveis

  const [isCategoryMinimized, setIsCategoryMinimized] = useState(false);
  // Encontra a categoria associada à task pelo categoryId
  const category = categories.find((cat) => cat.id === task.categoryId);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditName(task.description);
  };

  const handleDeleteTask = async () => {
    const planningDate = new Date(year, month - 1, day);
    await removeTask(planningDate, task.id);
  };

  const handleSaveEdit = async () => {
    if (editName.trim()) {
      const planningDate = new Date(year, month - 1, day);
      setEditingTask({ ...editingTask, description: editName });
      await updateTask(planningDate, editingTask);
      setEditingTask(null);
      setEditName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditName("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div
          key={task.id}
          className="flex justify-between items-center bg-white p-2 cursor-pointer rounded-lg hover:border-gray-500"
          style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
        >
          <div className="flex flex-col">
            <span
              onClick={() => setIsCategoryMinimized(!isCategoryMinimized)}
              className="px-2 py-1 rounded-md cursor-pointer"
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
              {!isCategoryMinimized &&
                (category ? category.name : "Sem categoria")}
            </span>

            <span>{task.description}</span>

            <span>{task.duration}</span>
          </div>

          <span>
            <button
              onClick={() => handleEditClick(task)}
              className="hover:bg-gray-600 p-1 rounded-sm"
            >
              <Edit2 size={16} />
            </button>
          </span>
          <span>
            <button
              onClick={handleDeleteTask}
              className="hover:bg-gray-600 p-1 rounded-sm"
            >
              <Trash2 size={16} />
            </button>
          </span>
        </div>
      </div>

      {editingTask && (
        <div className="flex flex-col gap-2 p-2 border rounded-lg bg-gray-100">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <div className="flex gap-2 w-full justify-between">
            <button
              onClick={handleSaveEdit}
              className="p-2 bg-blue-500 text-white rounded-md w-full"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 bg-red-500 text-white rounded-md w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
