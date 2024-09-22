import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCategory } from "../../contexts/CategoryContext";
import { Edit, Trash } from "react-feather";
import "./categoria.css";

const Categoria = ({ categoriaId }) => {
  const teste = useCategory();
  console.log(teste);
  const { categories, setSelectedCategory } = useCategory();
  const categoria = categories.find((cat) => cat.id === categoriaId);

  useEffect(() => {
    if (!categoria) {
      console.error(`Categoria com ID ${categoriaId} não encontrada.`);
    }
  }, [categoria, categoriaId]);

  if (!categoria) {
    return null;
  }

  return (
    <li>
      <button
        className="items-center px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500"
        id="category-button"
        onClick={() => setSelectedCategory(categoria)}
      >
        <div className="d-flex justify-between flex-1">
          <div className="d-flex">
            <span
              style={{ backgroundColor: categoria.color }}
              className="w-6 h-6 rounded-sm mr-2"
            >
              &nbsp;
            </span>
            <span>{categoria.name}</span>
          </div>

          <div className="d-flex actions-container">
            <button className="mr-2">
              <Edit size={16} color={"#fff"} />
            </button>
            <button>
              <Trash size={16} color={"#fff"} />
            </button>
          </div>
        </div>
      </button>
    </li>
  );
};

Categoria.propTypes = {
  categoriaId: PropTypes.number.isRequired,
};

export default Categoria;
