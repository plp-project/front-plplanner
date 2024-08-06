import api from './api';

const UserService = {
  login(data) {
    return api.post('/auth/login', data);
  },

  getById(id) {
    return api.get(`/user/${id}`);
  },

  registerUser(user) {
    return api.post('/user', user);
  },

  updateUser(id, user) {
    return api.put(`/user/${id}`, user);
  },

  findUserByEmail(email) {
    return api.get(`/user/email/${email}`);
  }
};

export default UserService;
