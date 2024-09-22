import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Play, CheckCircle, Clock } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { useCategory } from "../../contexts/CategoryContext";
import FloatingTimer from "./FloatingTimer";

const Task = ({ task, day, month, year }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editName, setEditName] = useState("");
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);
  const [newStatus, setNewStatus] = useState(task.status);
  const { removeTask, updateTask } = useTask();
  const { categories } = useCategory();

  const [isCategoryMinimized, setIsCategoryMinimized] = useState(true);
  const category = categories.find((cat) => cat.id === task.categoryId);

  // Função para definir o tempo inicial com base na duração da tarefa
  const getInitialDuration = () => {
    if (task.duration === "30m") {
      return 30 * 60;
    } else if (task.duration === "1h") {
      return 60 * 60;
    } else {
      const now = new Date();
      const currentHour = now.getHours();
      if (task.duration === "morning") {
        return (12 - currentHour) * 60 * 60;
      } else if (task.duration === "afternoon") {
        return (18 - currentHour) * 60 * 60;
      } else if (task.duration === "night") {
        return (24 - currentHour) * 60 * 60;
      }
    }
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowFloatingTimer(true);

    let durationInSeconds = timer;

    // Se a tarefa foi cancelada, reinicia o timer com a duração total
    if (newStatus === "todo" || newStatus === "executed") {
      durationInSeconds = getInitialDuration();
    }

    // Caso contrário, se a tarefa foi adiada, continua de onde parou
    if (!durationInSeconds) {
      durationInSeconds = getInitialDuration();
    }

    setTimer(durationInSeconds);

    const updatedTask = { ...task, status: "partially_executed" };
    const planningDate = new Date(year, month - 1, day);
    updateTask(planningDate, updatedTask);
    setNewStatus("partially_executed");
  };

  const finishTask = () => {
    setIsRunning(false);
    setShowFloatingTimer(false);
    setNewStatus("executed");

    const updatedTask = { ...task, status: "executed" };
    const planningDate = new Date(year, month - 1, day);
    updateTask(planningDate, updatedTask);
  };

  const postponeTask = () => {
    setIsRunning(false);
    setShowFloatingTimer(false);
    setNewStatus("postponed");

    const updatedTask = { ...task, status: "postponed", remainingTime: timer }; // Salva o tempo restante
    const planningDate = new Date(year, month - 1, day);
    updateTask(planningDate, updatedTask);
  };

  const resetTask = () => {
    setIsRunning(false);
    setShowFloatingTimer(false);
    setNewStatus("todo");

    const updatedTask = { ...task, status: "todo" };
    const planningDate = new Date(year, month - 1, day);
    updateTask(planningDate, updatedTask);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      finishTask();
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

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

  const closeFloatingTimer = () => {
    resetTask();
  };

  const getStatusBadge = (status) => {
    let color, label;
    switch (status) {
      case "todo":
        color = "bg-blue-500";
        label = "Em Aberto";
        break;
      case "partially_executed":
        color = "bg-yellow-500";
        label = "Em Progresso";
        break;
      case "executed":
        color = "bg-green-500";
        label = "Concluída";
        break;
      case "postponed":
        color = "bg-orange-500";
        label = "Adiada";
        break;
      default:
        color = "bg-gray-500";
        label = "Desconhecido";
    }
    return (
      <span className={`text-xs text-white py-1 px-2 rounded ${color}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div
          key={task.id}
          className="flex justify-between items-center bg-white p-3 cursor-pointer rounded-lg hover:border-gray-500"
          style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
        >
          <div className="flex flex-col gap-1">
            {/* Categoria */}
            <span
              onClick={() => setIsCategoryMinimized(!isCategoryMinimized)}
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
              {!isCategoryMinimized &&
                (category ? category.name : "Sem categoria")}
            </span>

            {/* Descrição */}
            <span
              className="font-semibold break-words"
              style={{
                fontSize: task.description.length > 20 ? "14px" : "16px", // diminui a fonte se passar de 50 caracteres
                wordBreak: "break-word", // permite quebra de linha
                whiteSpace: "normal", // mantém as quebras de linha naturais
              }}
            >
              {task.description}
            </span>

            {/* Duração */}
            <span className="text-sm text-gray-500 gap-1 flex items-center">
              <Clock size={14} /> {task.duration}
            </span>

            {/* Status */}
            <div className="mt-1">{getStatusBadge(newStatus)}</div>
          </div>

          <div className="flex gap-1">
            {/* Botão de Play */}
            <button
              onClick={startTimer}
              className={`hover:bg-gray-600 p-2 rounded-full ${
                isRunning ? "disabled" : ""
              }`}
            >
              <Play size={16} />
            </button>

            {/* Botão de Deletar */}
            <button
              onClick={handleDeleteTask}
              className="hover:bg-gray-600 p-2 rounded-full"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Timer Flutuante */}
      {showFloatingTimer && (
        <FloatingTimer
          time={timer}
          totalDuration={getInitialDuration()}
          onClose={closeFloatingTimer}
          onFinishTask={finishTask}
          onPostponeTask={postponeTask}
        />
      )}

      {/* Editar Task */}
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
