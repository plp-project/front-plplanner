import React from "react";
import { ChevronRight, ChevronLeft, Plus } from "react-feather";
import Categoria from "./Categoria";
import { SketchPicker } from "react-color";
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  
  const { user } = useAuth();
  
  
  const [categorias, setCategorias] = React.useState([
    { nome: "Categoria 1", cor: "#f87171" },
    { nome: "Categoria 2", cor: "#34d399" },
    { nome: "Categoria 3", cor: "#fbbf24" },
    { nome: "Categoria 4", cor: "#facc15" },
  ]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [novoNome, setNovoNome] = React.useState("");
  const [corSelecionada, setCorSelecionada] = React.useState("#ffffff");
  const [showForm, setShowForm] = React.useState(false);

  const adicionarCategoria = () => {
    if (novoNome && corSelecionada) {
      const novaCategoria = {
        nome: novoNome,
        cor: corSelecionada,
      };
      setCategorias([...categorias, novaCategoria]);
      setNovoNome("");
      setCorSelecionada("#ffffff");
      setShowForm(false);
    } else {
      alert("Preencha o nome e selecione a cor da categoria.");
    }
  };

  return (
    <div
      className={`bg-[#00585E] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 
        ${
        collapsed ? "w-[42px]" : "w-[280px]"
        }`}
    >
      {collapsed && (
        <div className="p-2 relative">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm p-1 absolute" style={{top: `22px`}}
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="p-3 flex justify-between border-b border-b-[#9fadbc29]">
          <div className="flex items-center space-x-4"> 

                <div className='content-flex flex-col'>
                  <span className='text-sm w-full'>{user?.name || "Usuário"}</span>
                  <br />
                  <span className="text-xs">{user?.email || "E-mail"}</span>
                </div>
                
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="Category">
            <div className="flex justify-between px-3 py-2">
              <h6>Categorias</h6>
              <button
                onClick={() => setShowForm(!showForm)}
                className="hover:bg-slate-600 p-1 rounded-sm"
              >
                <Plus size={16}></Plus>
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
            {categorias.map((categoria, index) => (
              <Categoria
                key={index}
                nome={categoria.nome}
                cor={categoria.cor}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
