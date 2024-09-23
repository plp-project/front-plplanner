import React, { createContext, useContext, useState, useEffect } from "react";
import CategoriaService from "../services/CategoriaService";
import { mapErrors } from "../helpers/languages";
import { toast } from "react-toastify";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleCategoryErrors(data) {
    const errors = mapErrors(data);
    const message = Array.isArray(errors) ? errors[0] : errors;
    toast.error(message);
  }

  // Função para buscar categorias
  const fetchCategories = async () => {
    try {
      const response = await CategoriaService.getAll();
      setCategories(response.data);
    } catch (error) {
      handleCategoryErrors(error.response.data);
      console.error("Erro ao buscar categorias:", error);
    }
  };

  // Função para adicionar uma nova categoria
  const addCategory = async (categoria) => {
    try {
      const response = await CategoriaService.create(categoria);
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      handleCategoryErrors(error.response.data);
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  // Função para atualizar uma categoria existente
  const updateCategory = async (id, categoria) => {
    try {
      const response = await CategoriaService.update(id, categoria);
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat.id === id ? response.data : cat))
      );
    } catch (error) {
      handleCategoryErrors(error.response.data);
      console.error("Erro ao atualizar categoria:", error);
    }
  };

  // Função para deletar uma categoria
  const deleteCategory = async (id) => {
    try {
      await CategoriaService.delete(id);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      handleCategoryErrors(error.response.data);
      console.error("Erro ao deletar categoria:", error);
    }
  };

  // Buscar categorias quando o componente é montado
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
