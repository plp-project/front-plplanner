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
  const [tasks, setTasks] = useState([]);

  async function addTask(date, taskDescription, duration, category) {
    const newTask = {
      description: taskDescription,
      duration: duration,
      categoryId: category.id,
      status: "todo",
    };

    let planning = getPlanningByDate(date);
    if (planning) {
      addTaskToPlan(planning, newTask);
    } else {
      await createPlanning(date, newTask);
    }
  }

  async function removeTask(planningDate, taskId) {
    const data = await TaskService.delete(taskId);
    if (!data || data.errors) return toast.error("Algo deu errado!");
    removeTaskFromPlan(planningDate, taskId);
    toast.success("Task removida!");
  }
  async function updateTask(planningDate, editingTask) {
    const data = await TaskService.update(editingTask);
    if (!data || data.errors) return toast.error("Algo deu errado!");
    updateTaskFromPlan(planningDate, editingTask);
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
