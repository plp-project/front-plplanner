import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCategory } from "../../contexts/CategoryContext";
import { Trash } from "react-feather";
import "./categoria.css";
import CategoryPopover from "../categoryPopover";

const Categoria = ({ categoriaId }) => {
  const { categories, deleteCategory } = useCategory();
  const categoria = categories.find((cat) => cat.id === categoriaId);

  useEffect(() => {
    if (!categoria) {
      console.error(`Categoria com ID ${categoriaId} não encontrada.`);
    }
  }, [categoria, categoriaId]);

  if (!categoria) {
    return null;
  }

  const excluirCategoria = async (categoriaId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmDelete) return;
    deleteCategory(categoriaId);
  };

  return (
    <li>
      <div className="items-center px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500 hover:bg-opacity-25">
        <div className="d-flex justify-between flex-1">
          <div className="d-flex">
            <span style={{ backgroundColor: categoria.color }} className="w-6 h-6 rounded-sm mr-2">
              &nbsp;
            </span>
            <span>{categoria.name}</span>
          </div>

          <div className="d-flex actions-container">
            <button className="mr-2">
              <CategoryPopover action="Editar" data={categoria} />
            </button>
            <button onClick={() => excluirCategoria(categoria.id)} className="hover:bg-gray-400 p-1 rounded-sm">
              <Trash size={16} color={"#fff"} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

Categoria.propTypes = {
  categoriaId: PropTypes.number.isRequired,
};

export default Categoria;
