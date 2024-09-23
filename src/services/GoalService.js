import api from "./api";

const GoalService = {
  async create({ name, description, duration, date, categoryId }) {
    try {
      const { data } = await api.post(`/goal/${categoryId}`, {
        name,
        description,
        duration,
        date,
      });
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async getAllByUser() {
    try {
      const { data } = await api.get(`/goal/`);
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async update(id, { name, description, duration, date, status }) {
    try {
      const { data } = await api.patch(`/goal/${id}`, {
        name,
        description,
        duration,
        date,
        status,
      });
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async delete(id) {
    try {
      const { data } = await api.delete(`/goal/${id}`);
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },
};

export default GoalService;
