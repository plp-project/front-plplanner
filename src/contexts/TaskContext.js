import { createContext, useContext, useState } from "react";
import { usePlanning } from "./PlanningContext";
import TaskService from "../services/TaskService";
import { toast } from "react-toastify";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const {
    getPlanningByDate,
    addTaskToPlan,
    createPlanning,
    removeTaskFromPlan,
    updateTaskFromPlan,
  } = usePlanning();
  const [taskDescription, setTaskDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  // Função para lidar com erros
  function handleTaskErrors(data) {
    const errors = data?.errors || "Algo deu errado!";
    const message = Array.isArray(errors) ? errors[0] : errors;
    toast.error(message);
  }

  // Função para validar campos obrigatórios e fornecer mensagens específicas
  function validateTaskFields(taskName, taskDescription, duration, category) {
    if (!taskName) {
      toast.error("Adicione um nome à Task!");
      return false;
    }
    if (!taskDescription) {
      toast.error("Adicione uma descrição à Task!");
      return false;
    }
    if (!duration) {
      toast.error("Adicione uma duração à Task!");
      return false;
    }
    if (!category) {
      toast.error("Adicione uma categoria à Task!");
      return false;
    }
    return true;
  }

  async function addTask(date, taskDescription, duration, category, taskName) {
    if (!validateTaskFields(taskName, taskDescription, duration, category)) {
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      duration: duration,
      categoryId: category.id,
      status: "todo",
    };

    try {
      let planning = getPlanningByDate(date);
      if (planning) {
        addTaskToPlan(planning, newTask);
      } else {
        await createPlanning(date, newTask);
      }
      toast.success("Task adicionada com sucesso!");
    } catch (error) {
      handleTaskErrors(error.response?.data);
    }
  }

  // Remover uma task
  async function removeTask(planningDate, taskId) {
    try {
      const data = await TaskService.delete(taskId);
      if (!data || data.errors) throw new Error(data);
      removeTaskFromPlan(planningDate, taskId);
      toast.success("Task removida!");
    } catch (error) {
      handleTaskErrors(error.response?.data);
    }
  }

  // Atualizar uma task
  async function updateTask(planningDate, editingTask) {
    try {
      const data = await TaskService.update(editingTask);
      if (!data || data.errors) throw new Error(data);
      updateTaskFromPlan(planningDate, editingTask);
      toast.success("Task atualizada com sucesso!");
    } catch (error) {
      handleTaskErrors(error.response?.data);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        taskDescription,
        setTaskDescription,
        removeTask,
        updateTask,
        taskName,
        setTaskName,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
