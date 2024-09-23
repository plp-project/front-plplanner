import { createContext, useContext, useState } from "react";
import GoalService from "../services/GoalService";
import { toast } from "react-toastify";

const GoalContext = createContext();

export const useGoal = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [goalDescription, setGoalDescription] = useState("");

  async function fetchGoals() {
    try {
      const data = await GoalService.getAllByUser(); 
      setGoals(data);
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
      toast.error("Erro ao buscar metas.");
    }
  }

  async function addGoal(categoryId, goal) {
    try {
      const data = await GoalService.create(categoryId, goal);
      setGoals((prevGoals) => [...prevGoals, data]);
      toast.success("Meta adicionada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar meta.");
    }
  }

  async function removeGoal(goalId) {
    try {
      await GoalService.delete(goalId);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      toast.success("Meta removida com sucesso!");
    } catch (error) {
      toast.error("Erro na remoção da meta.");
    }
  }

  async function updateGoal(goalId, updatedGoal) {
    try {
      const data = await GoalService.update(goalId, updatedGoal);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === goalId ? data : goal))
      );
      toast.success("Meta atualizada!");
    } catch (error) {
      toast.error("Erro na atualização da meta.");
    }
  }

  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
        goalDescription,
        setGoalDescription,
        fetchGoals,
        addGoal,
        removeGoal,
        updateGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
