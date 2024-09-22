import React, { useState } from "react";
import { getContrastingColor, hsvaToHex, Swatch } from "@uiw/react-color";
import { Check, ChevronLeft, Plus } from "react-feather";
import { Popover } from "react-tiny-popover";
import CategoriaService from "../../services/CategoriaService";
import { useCategory } from "../../contexts/CategoryContext";
import "./index.css";

function CategoryPopover() {
  const [novoNome, setNovoNome] = useState("");
  const { categories, setCategories } = useCategory();
  const [corSelecionada, setCorSelecionada] = useState("#ffffff");
  const [showForm, setShowForm] = useState(false);

  const adicionarCategoria = async () => {
    if (novoNome && corSelecionada) {
      const categoriaExistente = categories.find(
        (cat) => cat.nome === novoNome
      );
      if (categoriaExistente) {
        alert("Já existe uma categoria com esse nome.");
        return;
      }

      const novaCategoria = {
        name: novoNome,
        color: corSelecionada,
      };

      try {
        const response = await CategoriaService.create(novaCategoria);
        console.log("Adicionar Categoria", response);
        setCategories([...categories, response.data]);
        setNovoNome("");
        setCorSelecionada("#ffffff");
        setShowForm(false);
      } catch (error) {
        console.error("Erro ao adicionar categoria:", error);
      }
    } else {
      alert("Preencha o nome e selecione a cor da categoria.");
    }
  };

  function Point({ color, checked }) {
    if (!checked) return null;
    return <Check size={12} color={getContrastingColor(color)} />;
  }

  return (
    <>
      <Popover
        positions={"right"}
        containerStyle={{ top: "10%" }}
        isOpen={showForm}
        onClickOutside={() => setShowForm(false)}
        content={({ position, childRect, popoverRect }) => (
          <div className="popover-content">
            <div className="popover-header px-3 pt-2 ">
              <div className="d-flex justify-between items-center">
                <ChevronLeft
                  cursor={"pointer"}
                  size={16}
                  color="#000"
                  onClick={() => setShowForm(false)}
                />
                <p className="text-black">Categoria</p>
                <div style={{ width: "16px" }}></div>
              </div>
            </div>
            <div className="p-3">
              <div className="input-group">
                <label>
                  <p className="text-black">Título:</p>
                </label>
                <input
                  type="text"
                  placeholder="Título da Categoria"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="mt-2 mb-2 p-1 w-full text-black text"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div className="mb-2">
                <label>
                  <p className="text-black">Escolha uma cor:</p>
                </label>
                <Swatch
                  className="color-picker"
                  colors={[
                    "#F44E3B", // Coral Red
                    "#FE9200", // Orange
                    "#FCDC00", // Golden Yellow
                    "#DBDF00", // Lime
                    "#F4796B", // Soft Coral
                    "#FFB800", // Amber
                    "#FFF700", // Bright Yellow
                    "#D1DF00", // Olive
                    "#F26155", // Slightly Desaturated Coral
                    "#FFAC3A", // Tangerine
                  ]}
                  color={corSelecionada}
                  rectProps={{
                    children: <Point />,
                    style: {
                      width: "50px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                  onChange={(hsvColor) => {
                    setCorSelecionada(hsvaToHex(hsvColor));
                  }}
                />
              </div>
              <div className="d-flex justify-center items-center">
                <button
                  onClick={adicionarCategoria}
                  className="flex-1 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-sm"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="hover:bg-slate-600 p-1 rounded-sm"
        >
          <Plus size={16} />
        </button>
      </Popover>
    </>
  );
}

export default CategoryPopover;
