import React, { useState } from "react";
import { Plus } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { useCategory } from "../../contexts/CategoryContext";
import { toast } from "react-toastify";
import Modal from "./Modal";

const NewTask = ({ day, month, year }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    taskDescription,
    setTaskDescription,
    addTask,
    taskName,
    setTaskName,
  } = useTask();
  const { categories } = useCategory();
  const [duration, setDuration] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskName("");
    setTaskDescription("");
    setDuration("");
    setSelectedCategory("");
  };

  const handleShowAndAddTask = () => {
    taskDescription.trim();

    if (!taskName) {
      return toast.info("Preencha o nome da task.", {
        autoClose: 1500,
      });
    }
    if (taskName.length < 5) {
      return toast.info("O nome da task deve ter mais de 5 caracteres.", {
        autoClose: 1500,
      });
    }

    if (!selectedCategory) {
      return toast.info("Selecione uma categoria.", {
        autoClose: 1500,
      });
    }

    const planningDate = new Date(year, month - 1, day);

    addTask(
      planningDate,
      taskDescription,
      duration,
      selectedCategory,
      taskName
    );
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex w-full justify-center items-center gap-3 mt-3"
      >
        <Plus size={16} />
        Nova Task
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 p-4">
          {/* Título */}
          <div className="border-b pb-3">
            <h3 className="text-xl font-bold text-[#00585E]">Nova Task</h3>
          </div>

          {/* Nome da Task */}
          <div className="mt-2">
            <label className="block text-sm text-left font-medium text-[#00585E]">
              Nome da Task
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Insira o nome da Task"
              className="border border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all focus:outline-none"
            />
          </div>

          {/* Duração */}
          <div className="mt-2">
            <label className="text-sm block text-left font-medium text-[#00585E]">
              Duração
            </label>
            <select
              value={duration}
              defaultValue={""}
              onChange={(e) => setDuration(e.target.value)}
              className="border border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all focus:outline-none"
            >
              <option value="" disabled>
                Selecione uma duração
              </option>
              <option value="30m">30 minutos</option>
              <option value="1h">1 hora</option>
              <option value="morning">Manhã</option>
              <option value="afternoon">Tarde</option>
              <option value="night">Noite</option>
            </select>
          </div>

          {/* Categoria */}
          <div className="mt-2">
            <label className="block text-sm text-left font-medium text-[#00585E]">
              Categoria
            </label>
            <select
              value={selectedCategory?.id || ""}
              onChange={(e) =>
                setSelectedCategory(
                  categories.find((cat) => cat.id === Number(e.target.value))
                )
              }
              className="border border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all focus:outline-none"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Descrição */}
          <div className="mt-2">
            <label className="block text-sm text-left font-medium text-[#00585E]">
              Descrição
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Insira uma descrição sobre sua Task"
              className="border border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all focus:outline-none"
            />
          </div>

          {/* Botão de criar task */}
          <div className="flex p-1 mt-4 justify-end">
            <button
              onClick={handleShowAndAddTask}
              className="p-2 rounded-lg bg-[#00585E] text-white hover:bg-[#007F87] transition-all"
            >
              Criar task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewTask;
