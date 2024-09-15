import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import PlanningService from "../services/PlanningService";
import TaskService from "../services/TaskService";
import { mapErrors } from "../helpers/languages";
import { toast } from "react-toastify";

const PlanningContext = createContext();

export const usePlanning = () => useContext(PlanningContext);

export const PlanningProvider = ({ children }) => {
	const { user } = useAuth();
	const [plannings, setPlannings] = useState([]);

	function getPlanningByDate(date) {
		if (!Array.isArray(plannings)) return null; // Garantir que plannings seja um array

		const planFiltered = plannings.filter((planning) => {
			const planningDate = new Date(Date.parse(planning.day));
			const planningDay = planningDate.getDate();
			const planningMonth = planningDate.getMonth() + 1;
			const planningYear = planningDate.getFullYear();
			return (
				planningDay === date.getDate() &&
				planningMonth === date.getMonth() + 1 &&
				planningYear === date.getFullYear()
			);
		});
		return planFiltered.length > 0 ? planFiltered[0] : null;
	}

	function handleTaskErrors(errors) {
		const mappedErrors = mapErrors(errors);
		mappedErrors.map((msg) => toast.error(msg, { autoClose: 1500 }));
	}

	async function addTaskToPlan(planning, newTask) {
		const data = await TaskService.create(planning.id, newTask);

		if (!data || data.errors) return handleTaskErrors(data.errors);

		const newPlan = {
			...planning,
			tasks: [...planning.tasks, newTask],
		};

		setPlannings((oldPlannings) => {
			return oldPlannings.map((p) => (p.id === newPlan.id ? newPlan : p));
		});
	}

	function removeTaskFromPlan(date, taskId) {
		const planning = getPlanningByDate(date);
		const tasks = planning.tasks.filter((task) => task.id !== taskId);
		const newPlan = {
			...planning,
			tasks,
		};
		setPlannings((oldPlannings) => {
			return oldPlannings.map((p) => (p.id === newPlan.id ? newPlan : p));
		});
	}

	function updateTaskFromPlan(date, editingTask) {
		const planning = getPlanningByDate(date);
		const tasks = planning.tasks.map((t) =>
			t.id === editingTask.id ? editingTask : t
		);
		const newPlan = {
			...planning,
			tasks,
		};
		setPlannings((oldPlannings) => {
			return oldPlannings.map((p) => (p.id === newPlan.id ? newPlan : p));
		});
	}

	async function createPlanning(date, newTask) {
		const newPlanning = await PlanningService.create(date, [newTask]);

		if (newPlanning.errors) return;
		setPlannings((oldPlannings) => [...oldPlannings, newPlanning]);
	}

	useEffect(() => {
		const fetchPlanning = async () => {
			if (!user) return;
			const data = await PlanningService.getAllByUser();
			setPlannings(data);
		};
		fetchPlanning();
	}, []);

	console.log("Plannings: ", plannings);

	return (
		<PlanningContext.Provider
			value={{
				plannings,
				getPlanningByDate,
				createPlanning,
				addTaskToPlan,
				removeTaskFromPlan,
				updateTaskFromPlan,
			}}
		>
			{children}
		</PlanningContext.Provider>
	);
};
