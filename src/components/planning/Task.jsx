import React, { useState, useEffect } from "react";
import { Edit2, x, Trash2, Play, CheckCircle, Clock, X } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { useCategory } from "../../contexts/CategoryContext";
import FloatingTimer from "./FloatingTimer";
import Modal from "./Modal";

const Task = ({ task, day, month, year }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDuration, setEditDuration] = useState(task.duration);
  const [editCategoryId, setEditCategoryId] = useState(task.categoryId);
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);
  const [newStatus, setNewStatus] = useState(task.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { removeTask, updateTask } = useTask();
  const { categories } = useCategory();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingDuration, setIsEditingDuration] = useState(false);

  const [isCategoryMinimized, setIsCategoryMinimized] = useState(true);
  const category = categories.find((cat) => cat.id === task.categoryId);

  const getInitialDuration = () => {
    if (task.duration === "30m") {
      return 30 * 60;
    } else if (task.duration === "1h") {
      return 60 * 60;
    } else {
      const now = new Date();
      const currentHour = now.getHours();
      if (task.duration === "morning") {
        if (currentHour > 12) {
          return (36 - currentHour) * 60 * 60;
        }
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
    setEditName(task.name);
    setEditDescription(task.description);
    setEditDuration(task.duration);
    setEditCategoryId(task.categoryId);
  };

  const handleDeleteTask = async () => {
    const planningDate = new Date(year, month - 1, day);
    await removeTask(planningDate, task.id);
  };

  const handleSaveEdit = async () => {
    const updatedTask = {
      ...task,
      name: editName,
      description: editDescription,
      categoryId: editCategoryId,
      duration: editDuration,
    };

    const planningDate = new Date(year, month - 1, day);
    await updateTask(planningDate, updatedTask); // Atualiza a task no backend

    // Atualiza o estado da task após a edição ser salva
    setEditingTask(updatedTask);

    // Reseta os modos de edição
    setIsEditingName(false);
    setIsEditingDescription(false);
    setIsEditingCategory(false);
    setIsEditingDuration(false);

    closeModal(); // Fecha o modal após salvar
  };

  const closeFloatingTimer = () => {
    resetTask();
  };
  const openModal = () => {
    // Preencher os campos de edição com os valores atuais da task
    setEditName(task.name);
    setEditDescription(task.description);
    setEditDuration(task.duration);
    setEditCategoryId(task.categoryId);

    setIsModalOpen(true); // Abrir o modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          onClick={openModal}
          className="flex justify-between items-center bg-white p-3 cursor-pointer rounded-lg hover:border-gray-500"
          style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
        >
          <div className="flex flex-col gap-1">
            {/* Categoria */}
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
              {!isCategoryMinimized &&
                (category ? category.name : "Sem categoria")}
            </span>

            {/* Nome */}
            <span
              className="font-semibold break-words"
              style={{
                fontSize: task.name.length > 20 ? "14px" : "16px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {task.name}
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
              onClick={(e) => {
                e.stopPropagation();
                startTimer();
              }}
              className={`hover:bg-gray-600 p-2 rounded-full ${
                isRunning ? "disabled" : ""
              }`}
            >
              <Play size={16} />
            </button>

            {/* Botão de Deletar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask();
              }}
              className="hover:bg-gray-600 p-2 rounded-full"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 p-4">
          <div className="border-b pb-3">
            <h3 className="text-xl font-bold text-[#00585E]">
              {editName || task.name}
            </h3>
          </div>

          {/* Nome */}
          <div className="pt-4 mb-4 flex justify-between">
            <div className="m-0 flex items-start flex-col w-full">
              <label className="text-gray-700 text-base font-semibold text-[#00585E]">
                Nome:
              </label>
              {isEditingName ? (
                <div className="flex justify-between w-full gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-400 focus:border-blue-500 transition-all rounded-lg w-full p-2 mt-1"
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <p>{task.name}</p>
              )}
            </div>
            {!isEditingName && (
              <button
                onClick={() => setIsEditingName(true)}
                className="ml-2 text-[#00585E] hover:text-[#008F91] transition-all"
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>
          {/* Duração */}
          <div className="mb-8 flex justify-between items-center">
            <div className="m-0 flex items-start flex-col w-full">
              <label className="text-gray-700 text-base font-semibold text-[#00585E]">
                Duração:
              </label>
              {isEditingDuration ? (
                <div className="flex justify-between gap-2 w-full">
                  <select
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    className="border border-gray-400 focus:border-blue-500 transition-all rounded-lg w-full p-2 mt-1"
                  >
                    <option value="30m">30 minutos</option>
                    <option value="1h">1 hora</option>
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="night">Noite</option>
                  </select>
                  <button
                    onClick={() => setIsEditingDuration(false)}
                    className="text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <p>{task.duration}</p>
              )}
            </div>
            {!isEditingDuration && (
              <button
                onClick={() => setIsEditingDuration(true)}
                className="ml-2 text-[#00585E] hover:text-[#008F91] transition-all"
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>
          {/* Categoria */}
          <div className="mb-4 flex justify-between items-center">
            <div className="m-0 flex items-start flex-col w-full">
              <label className="text-gray-700 text-base font-semibold text-[#00585E]">
                Categoria:
              </label>
              {isEditingCategory ? (
                <div className="flex justify-between w-full gap-2">
                  <select
                    value={editCategoryId}
                    onChange={(e) => setEditCategoryId(Number(e.target.value))}
                    className="border border-gray-400 focus:border-blue-500 transition-all rounded-lg w-full p-2 mt-1"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsEditingCategory(false)}
                    className="text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <p>{category ? category.name : "Sem categoria"}</p>
              )}
            </div>
            {!isEditingCategory && (
              <button
                onClick={() => setIsEditingCategory(true)}
                className="ml-2 text-[#00585E] hover:text-[#008F91] transition-all"
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>

          {/* Descrição */}
          <div className="mb-4 flex justify-between">
            <div className="m-0 flex items-start flex-col w-full">
              <label className=" text-base font-semibold text-[#00585E]">
                Descrição:
              </label>
              {isEditingDescription ? (
                <div className="flex justify-between w-full gap-2">
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border border-gray-400 focus:border-blue-500 transition-all rounded-lg w-full p-2 mt-1"
                  />
                  <button
                    onClick={() => setIsEditingDescription(false)}
                    className="text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <p>{task.description}</p>
              )}
            </div>
            {!isEditingDescription && (
              <button
                onClick={() => setIsEditingDescription(true)}
                className="ml-2 text-[#00585E] hover:text-[#008F91] transition-all"
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-start gap-4 mt-4">
            <button
              onClick={handleSaveEdit}
              className="bg-[#00585E] text-white p-2 rounded-lg hover:bg-[#008F91] transition-all"
            >
              Salvar
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Timer */}
      {showFloatingTimer && (
        <FloatingTimer
          time={timer}
          totalDuration={getInitialDuration()}
          onClose={closeFloatingTimer}
          onFinishTask={finishTask}
          onPostponeTask={postponeTask}
        />
      )}
    </div>
  );
};

export default Task;
