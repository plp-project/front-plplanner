import api from "./api";

const ReportService = {
  async create(date, period) {
    try {
      const { data } = await api.post(`/report/`, { date, period });
      return data;
    } catch (err) {
      return { errors: err.response.data };
    }
  },
};

export default ReportService;
