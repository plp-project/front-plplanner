import { useEffect, useState } from "react";
import { useGoal } from "../../contexts/GoalContext";
import GoalHeader from "./GoalHeader";
import NewGoal from "./NewGoal";
import EditGoalModal from "./EditGoalModal";
import GoalColumn from "./GoalColumn";
import Modal from "../../components/planning/Modal";
import "./goal.css";

const GoalMain = () => {
  const { goals, addGoal, updateGoal, removeGoal, fetchGoals } = useGoal();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalDuration, setGoalDuration] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const openAddGoalModal = (duration) => {
    setGoalDuration(duration);
    setIsAddModalOpen(true);
  };

  const openEditGoalModal = (goal) => {
    setSelectedGoal(goal);
    setIsEditModalOpen(true);
  };

  const closeAddModal = () => setIsAddModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleDeleteGoal = async (goalId) => {
    await removeGoal(goalId);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <GoalHeader />
      <div className="w-full d-grid grid-cols-3 px-5 my-3 gap-5">
        <GoalColumn
          title="Semanal"
          duration="weekly"
          goals={goals}
          onEdit={openEditGoalModal}
          onDelete={handleDeleteGoal}
          onAddGoal={() => openAddGoalModal("weekly")}
        />
        <GoalColumn
          title="Mensal"
          duration="monthly"
          goals={goals}
          onEdit={openEditGoalModal}
          onDelete={handleDeleteGoal}
          onAddGoal={() => openAddGoalModal("monthly")}
        />
        <GoalColumn
          title="Anual"
          duration="yearly"
          goals={goals}
          onEdit={openEditGoalModal}
          onDelete={handleDeleteGoal}
          onAddGoal={() => openAddGoalModal("yearly")}
        />
      </div>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <NewGoal closeModal={closeAddModal} createGoal={addGoal} duration={goalDuration} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <EditGoalModal goal={selectedGoal} closeModal={closeEditModal} editGoal={updateGoal} />
      </Modal>
    </div>
  );
};

export default GoalMain;
