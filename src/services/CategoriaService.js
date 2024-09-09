import api from './api';

const CategoriaService = {
  async getAll() {
    return await api.get('/category');
  },

  getById(id) {
    if (!id) {
      throw new Error("ID é obrigatório para buscar uma categoria.");
    }
    return api.get('/category/${id}');
  },

  create(categoria) {
    if (!categoria || !categoria.name) {
      throw new Error("Categoria deve ter um nome e userId para ser criada.");
    }
    return api.post('/category', categoria);
  },

  update(id, categoria) {
    if (!id || !categoria) {
      throw new Error("ID e dados da categoria são obrigatórios para atualizar.");
    }
    return api.put('/category/${id}', categoria);
  },

  delete(id) {
    if (!id) {
      throw new Error("ID é obrigatório para deletar uma categoria.");
    }
    return api.delete('/category/${id}');
  },
};

export default CategoriaService;