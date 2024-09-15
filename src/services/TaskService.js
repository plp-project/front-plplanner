import api from "./api";

const TaskService = {
	async create(planningId, task) {
		try {
			const { data } = await api.post(`/task/${planningId}`, task);
			return data;
		} catch (err) {
			return { errors: err.response.data };
		}
	},
	async update(task) {
		try {
			const { data } = await api.patch(`/task/${task.id}`, { ...task });
			return data;
		} catch (err) {
			return { errors: err.response.data };
		}
	},
	async delete(taskId) {
		try {
			const { data } = await api.delete(`/task/${taskId}`);
			return data;
		} catch (err) {
			return { errors: err.response.data };
		}
	},
};

export default TaskService;
