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
	const [taskName, setTaskName] = useState("");
	const [tasks, setTasks] = useState([]);

	const addTask = async (date) => {
		console.log("date: ", date);
		const newTask = {
			description: taskName,
			duration: "30m",
			categoryId: 1,
		};
		let planning = getPlanningByDate(date);
		console.log("planning", planning);
		if (planning) {
			addTaskToPlan(planning, newTask);
		} else {
			await createPlanning(date, newTask);
		}
	};

	async function removeTask(planningDate, taskId) {
		const data = await TaskService.delete(taskId);

		if (!data || data.errors) {
			toast.error("Algo deu errado!");
			console.log(data.errors);
		}

		removeTaskFromPlan(planningDate, taskId);
		toast.success("Task removida!");
	}

	async function updateTask(planningDate, editingTask) {
		const data = await TaskService.update(editingTask);
		if (!data || data.errors) {
			toast.error("Algo deu errado!");
			console.log(data.errors);
		}
		updateTaskFromPlan(planningDate, editingTask);
	}

	return (
		<TaskContext.Provider
			value={{
				tasks,
				setTasks,
				addTask,
				taskName,
				setTaskName,
				removeTask,
				updateTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
