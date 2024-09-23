import React, { useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import { toast } from "react-toastify";

const goalStatuses = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PARTIALLY_SUCCESS: 'partially_success',
  TODO: 'todo'
};

const EditGoalModal = ({ goal, closeModal, editGoal }) => {
  const [goalTitle, setGoalTitle] = useState(goal.name || "");
  const [goalDescription, setGoalDescription] = useState(goal.description || "");
  const [selectedCategory, setSelectedCategory] = useState(goal.categoryId || null);
  const [status, setStatus] = useState(goal.status || goalStatuses.TODO);
  const { categories } = useCategory();

  const handleSave = () => {
    if (!goalTitle.trim()) {
      return toast.info("Preencha o nome da meta.", { autoClose: 1500 });
    }
    if (goalTitle.length < 3) {
      return toast.info("O nome da meta deve ter mais de 3 caracteres.", { autoClose: 1500 });
    }
    if (!goalDescription.trim()) {
      return toast.info("Preencha a descrição da meta.", { autoClose: 1500 });
    }
    if (goalDescription.length < 10) {
      return toast.info("A descrição deve ter mais de 10 caracteres.", { autoClose: 1500 });
    }
    if (!selectedCategory) {
      return toast.info("Selecione uma categoria.", { autoClose: 1500 });
    }

    const updatedGoal = {
      ...goal,
      name: goalTitle,
      description: goalDescription,
      categoryId: selectedCategory,
      status: status
    };

    editGoal(goal.id, updatedGoal);
    closeModal();
  };

  return (
    <div>
      <div className="flex flex-col gap-3 text-black">
        <div className="border-b pb-3">
          <h3 className="text-xl font-medium ">Editar Meta</h3>
        </div>

        <div className="mt-2">
          <label className="block text-xs text-left">Nome da Meta</label>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="Insira o nome da meta"
            className="p-1 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
          />
        </div>

        <div className="mt-2">
          <label className="block text-xs text-left">Descrição</label>
          <input
            type="text"
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
            placeholder="Insira a descrição"
            className="p-1 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
          />
        </div>

        <div className="mt-2">
          <label className="block text-xs text-left">Categoria</label>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(categories.find(cat => cat.id === Number(e.target.value)))}
            className="p-2 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <label className="block text-xs text-left">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
          >
            <option value={goalStatuses.SUCCESS}>Concluída</option>
            <option value={goalStatuses.FAILED}>Não Concluída</option>
            <option value={goalStatuses.PARTIALLY_SUCCESS}>Parcialmente</option>
            <option value={goalStatuses.TODO}>Pendente</option>
          </select>
        </div>

        <div className="flex p-1 mt-2">
          <button onClick={handleSave} className="p-2 rounded bg-[#00585E] text-white mr-2">
            Salvar Meta
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalModal;
