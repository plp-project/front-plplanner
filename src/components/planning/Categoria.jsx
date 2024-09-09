import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCategory } from "../../contexts/CategoryContext";

const Categoria = ({ categoriaId }) => {
  const teste = useCategory();
  console.log(teste);
  const {categories, setSelectedCategory } = useCategory();
  const categoria = categories.find(cat => cat.id === categoriaId);

  useEffect(() => {
    if (!categoria) {
      console.error('Categoria com ID ${categoriaId} não encontrada.');
    }
  }, [categoria, categoriaId]);

  if (!categoria) {
    return null;
  }

  return (
    <li>
      <button
        className="items-center px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500"
        onClick={() => setSelectedCategory(categoria)}
      >
        <span
          style={{ backgroundColor: categoria.color }}
          className="w-6 h-6 rounded-sm mr-2"
        >
          &nbsp;
        </span>
        <span>{categoria.name}</span>
      </button>
    </li>
  );
};

Categoria.propTypes = {
  categoriaId: PropTypes.number.isRequired,
};

export default Categoria;