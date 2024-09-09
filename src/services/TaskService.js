import api from './api';

const TaskService = {
  async create(task) {
    return await api.post('/task', task);
  },
};

export default TaskService;
