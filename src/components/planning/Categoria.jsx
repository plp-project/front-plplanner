import React from "react";

const Categoria = ({ nome, cor }) => {
  return (
    <li>
      <button className="items-center px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500">
        <span
          style={{ backgroundColor: cor }}
          className="w-6 h-6 rounded-sm mr-2"
        >
          &nbsp;
        </span>
        <span>{nome}</span>
      </button>
    </li>
  );
};

export default Categoria;
