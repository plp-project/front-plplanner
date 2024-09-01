import React, { createContext, useContext, useState, useEffect } from "react";
import CategoriaService from "../services/CategoriaService";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Função para buscar categorias
    const fetchCategories = async (userId) => {
        try {
            console.log("ANTES DO RESPONSE");
            const response = await CategoriaService.getAll(userId);
            console.log("Response", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    // Função para adicionar uma nova categoria
    const addCategory = async (categoria) => {
        try {
            const response = await CategoriaService.create(categoria);
            setCategories(prevCategories => [...prevCategories, response.data]);
        } catch (error) {
            console.error("Erro ao adicionar categoria:", error);
        }
    };

    // Função para atualizar uma categoria existente
    const updateCategory = async (id, categoria) => {
        try {
            const response = await CategoriaService.update(id, categoria);
            setCategories(prevCategories => 
                prevCategories.map(cat => (cat.id === id ? response.data : cat))
            );
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
        }
    };

    // Função para deletar uma categoria
    const deleteCategory = async (id) => {
        try {
            await CategoriaService.delete(id);
            setCategories(prevCategories => 
                prevCategories.filter(cat => cat.id !== id)
            );
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
        }
    };

    // Buscar categorias quando o componente é montado
    useEffect(() => {
        const userId = 1; // Pode ser modificado para pegar o ID do usuário autenticado
        fetchCategories(userId);
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, selectedCategory, setSelectedCategory, addCategory, updateCategory, deleteCategory, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};
