import { useState } from "react";
import { useGoal } from "../../contexts/GoalContext";
import GoalHeader from './GoalHeader';
import NewGoal from "./NewGoal"; 
import EditGoalModal from "./EditGoalModal"; 
import GoalCard from "./GoalCard";
import { Plus } from "react-feather";
import Modal from "../../components/planning/Modal";
import "./goal.css";

const GoalMain = () => {
    const { goals, addGoal, updateGoalStatus, removeGoal } = useGoal(); 
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [goalDuration, setGoalDuration] = useState(null);

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
            <div className="w-full d-grid grid-cols-3 px-4 my-3">
                <div className="goal-column">
                    <span>Semanal</span>
                    {goals.filter(goal => goal.duration === 'weekly').map(goal => (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal} 
                            onClick={() => openEditGoalModal(goal)} 
                            onDelete={() => handleDeleteGoal(goal.id)} 
                        />
                    ))}
                    <button onClick={() => openAddGoalModal('weekly')}>
                        <Plus size={16} /><span>Nova Meta</span>
                    </button>
                </div>
                <div className="goal-column">
                    <span>Mensal</span>
                    {goals.filter(goal => goal.duration === 'monthly').map(goal => (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal} 
                            onClick={() => openEditGoalModal(goal)} 
                            onDelete={() => handleDeleteGoal(goal.id)}
                        />
                    ))}
                    <button onClick={() => openAddGoalModal('monthly')} className="btn-add-goal">
                        <Plus size={16} /><span>Nova Meta</span>
                    </button>
                </div>
                <div className="goal-column">
                    <span>Anual</span>
                    {goals.filter(goal => goal.duration === 'yearly').map(goal => (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal} 
                            onClick={() => openEditGoalModal(goal)} 
                            onDelete={() => handleDeleteGoal(goal.id)}
                        />
                    ))}
                    <button onClick={() => openAddGoalModal('yearly')} className="btn-add-goal">
                        <Plus size={16} /><span>Nova Meta</span>
                    </button>
                </div>
            </div>
            
            <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                <NewGoal 
                    closeModal={closeAddModal}
                    createGoal={addGoal}
                    duration={goalDuration}
                />
            </Modal>
            <Modal isOpen={isEditModalOpen}>
                <EditGoalModal 
                    goal={selectedGoal} 
                    closeModal={closeEditModal} 
                    updateGoalStatus={updateGoalStatus}
                />
            </Modal>
        </div>
    );
};

export default GoalMain;
