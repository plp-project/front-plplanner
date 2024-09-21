import React, { useState } from "react";
import { Plus } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { useCategory } from "../../contexts/CategoryContext";
import { toast } from "react-toastify";
import Modal from "./Modal";

const NewTask = ({ day, month, year }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { taskDescription, setTaskDescription, addTask } = useTask();
  const { categories } = useCategory();
  const [duration, setDuration] = useState("30m");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleShowAndAddTask = () => {
    taskDescription.trim();

    if (!taskDescription) {
      return toast.info("Preencha o nome da task.", {
        autoClose: 1500,
      });
    }
    if (taskDescription.length < 5) {
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

    addTask(planningDate, taskDescription, duration, selectedCategory);

    setTaskDescription("");
    setDuration("");
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="flex w-full justify-center items-center gap-3 mt-3">
        <Plus size={16} />
        Nova Task
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-3">
          <div className="mt-2 ">
            <label className="block text-xs text-left">Descrição</label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Insira a descrição"
              className="p-1 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
            />
          </div>

          <div className="mt-2 ">
            <label className="text-xs block text-left">Duração</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="p-2 pr-3 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
            >
              <option value="30m">30 minutos</option>
              <option value="1h">1 hora</option>
              <option value="morning">Manhã</option>
              <option value="afternoon">Tarde</option>
              <option value="night">Noite</option>
            </select>
          </div>

          <div className="mt-2">
            <label className="block text-xs text-left">Categoria</label>
            <select
              value={selectedCategory?.id || ""}
              onChange={(e) => setSelectedCategory(categories.find((cat) => cat.id === Number(e.target.value)))}
              className="p-2 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botão de criar task */}
          <div className="flex p-1 mt-2">
            <button onClick={handleShowAndAddTask} className="p-2 rounded bg-[#00585E] text-white mr-2">
              Criar task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewTask;
