import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Plus } from "react-feather";
import Categoria from "./Categoria";
import { SketchPicker } from "react-color";
import { useAuth } from "../../contexts/AuthContext";
import CategoriaService from "../../services/CategoriaService";
import { useCategory } from "../../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { categories, setCategories } = useCategory();
  const [collapsed, setCollapsed] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("#ffffff");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

  return (
    <div
      className={`bg-[#00585E] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex flex-col ${collapsed ? "w-[42px]" : "w-[280px]"}`
      }
    >
      {collapsed && (
        <div className="p-2 relative">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm p-1 absolute"
            style={{ top: "22px" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
      {!collapsed && (
        <div className="flex flex-col h-full">
          <div className="p-3 flex justify-between border-b border-b-[#9fadbc29] flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="content-flex flex-col">
                <span className="text-sm w-full">
                  {user?.name || "Usuário"}
                </span>
                <br />
                <span className="text-xs">{user?.email || "E-mail"}</span>
              </div>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="flex-grow">
            <div className="Category">
              <div className="flex justify-between px-3 py-2">
                <h6>Categorias</h6>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {showForm && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Nome da Categoria"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="mb-2 p-1 w-full rounded-sm bg-[#1a1d21] text-white"
                />
                <div className="mb-2">
                  <SketchPicker
                    color={corSelecionada}
                    onChangeComplete={(color) => setCorSelecionada(color.hex)}
                  />
                </div>
                <button
                  onClick={adicionarCategoria}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-sm"
                >
                  Adicionar Categoria
                </button>
              </div>
            )}

            <ul>
              {categories &&
                categories.map((categoria, index) => (
                  <Categoria
                    key={index}
                    categoriaId={categoria.id}
                    nome={categoria.name}
                    cor={categoria.color}
                  />
                ))}
            </ul>
          </div>
          <div className="p-3 border-t border-t-[#9fadbc29] flex-shrink-0">
            <button
              onClick={handleLogout}
              className="text-xs text py-1 flex items-center"
            >
              <SlLogout size={16} className="mr-2" />
              <strong>Sair da Conta</strong>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
