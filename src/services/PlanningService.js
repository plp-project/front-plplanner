import api from "./api";

const PlanningService = {
	async getAllByUser() {
		try {
			const { data } = await api.get(`/planning/`);
			return data;
		} catch (err) {
			return { errors: err.response.data };
		}
	},

	async create(day, tasks) {
		try {
			const { data } = await api.post(`/planning/`, { day, tasks });
			return data;
		} catch (err) {
			return { errors: err.response.data };
		}
	},
};

export default PlanningService;
