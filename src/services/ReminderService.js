import api from "./api";

const ReminderService = {
  async create({ description, type, date }) {
    try {
      const { data } = await api.post(`/reminder/`, {
        description,
        type,
        date,
      });
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async getAllByUser() {
    try {
      const { data } = await api.get(`/reminder/`);
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async update(id, { description, type, date }) {
    try {
      const { data } = await api.patch(`/reminder/${id}`, {
        description,
        type,
        date,
      });
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },

  async delete(id) {
    try {
      const { data } = await api.delete(`/reminder/${id}`);
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },
};

export default ReminderService;
