import React, { useEffect, useState } from "react";
import { getContrastingColor, hsvaToHex, Swatch } from "@uiw/react-color";
import { Check, ChevronLeft, Edit, Plus } from "react-feather";
import { Popover } from "react-tiny-popover";
import { useCategory } from "../../contexts/CategoryContext";
import { categoryColors } from "./categoryColors";
import "./index.css";
import { toast } from "react-toastify";

function CategoryPopover({ action, data }) {
  const { addCategory, updateCategory } = useCategory();
  const [nomeCategoria, setNomeCategoria] = useState(data ? data.name : "");
  const [corSelecionada, setCorSelecionada] = useState(data ? data.color : "");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data && action === "Editar" && !showForm) {
      setNomeCategoria(data.name);
      setCorSelecionada(data.color);
    }
  }, [data, action, showForm]);

  const salvarCategoria = async () => {
    if (nomeCategoria && corSelecionada) {
      const categoria = {
        name: nomeCategoria,
        color: corSelecionada,
      };

      if (action === "Criar") {
        addCategory(categoria);
      }
      if (action === "Editar") {
        updateCategory(data.id, categoria);
      }

      setNomeCategoria("");
      setCorSelecionada("");
      setShowForm(false);
    } else {
      toast.info("Preencha o nome e selecione a cor da categoria.");
    }
  };

  function Point({ color, checked }) {
    if (!checked) return null;
    return <Check size={12} color={getContrastingColor(color)} />;
  }

  return (
    <>
      <Popover
        positions={["right", "top"]}
        containerStyle={{}}
        isOpen={showForm}
        onClickOutside={() => setShowForm(false)}
        content={({ position, childRect, popoverRect }) => (
          <div className="popover-content bg-white rounded-xl p-2 border-1 border-gray-300">
            <div className="popover-header px-3 pt-2">
              <div className="d-flex justify-between pb-2 items-center border-b border-gray-300">
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
                  value={nomeCategoria}
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  className="my-2 py-1 px-2 w-full text-black outline-none hover:bg-gray-50 focus:border focus:border-gray-300"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div className="my-1">
                <label>
                  <p className="text-black">Escolha uma cor:</p>
                </label>
                <Swatch
                  className="color-picker mt-2"
                  colors={categoryColors}
                  color={corSelecionada}
                  rectProps={{
                    children: <Point />,
                    style: {
                      width: "40px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    },
                  }}
                  onChange={(hsvColor) => {
                    setCorSelecionada(hsvaToHex(hsvColor));
                  }}
                />
              </div>
              <div className="d-flex justify-center items-center">
                <button
                  onClick={salvarCategoria}
                  className="flex-1 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-sm"
                >
                  {action}
                </button>
              </div>
            </div>
          </div>
        )}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="hover:bg-gray-400 p-1 rounded-sm"
        >
          {action === "Criar" ? (
            <Plus size={16} />
          ) : (
            <Edit size={16} color={"#fff"} />
          )}
        </button>
      </Popover>
    </>
  );
}

export default CategoryPopover;
