import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Home, BarChart, Map, Mail } from "react-feather";
import Categoria from "./Categoria";
import { useAuth } from "../../contexts/AuthContext";
import { useCategory } from "../../contexts/CategoryContext";
import { Link, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import CategoryPopover from "../categoryPopover";
import "./sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { categories } = useCategory();
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateButtons = [
    { component: Home, title: "Home", page: "/home" },
    { component: Map, title: "Metas", page: "/goals" },
    { component: Mail, title: "Lembretes", page: "/reminds" },
    { component: BarChart, title: "Relatórios", page: "/reports" },
  ];

  return (
    <div
      className={`bg-[#00585E] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex flex-col ${
        collapsed ? "w-[42px]" : "w-[280px]"
      }`}
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
                <span className="text-sm w-full">{user?.name || "Usuário"}</span>
                <br />
                <span className="text-xs">{user?.email || "E-mail"}</span>
              </div>
            </div>
            <button onClick={() => setCollapsed(!collapsed)} className="hover:bg-slate-600 rounded-sm">
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="flex-grow">
            <div className="nav-container b border-b border-b-[#9fadbc29]">
              {navigateButtons.map(({ component: Icon, page, title }, index) => (
                <>
                  <div className="d-flex">
                    <Link to={page} className="d-flex flex-1 py-2 px-3 hover:bg-[#3e3e3e] ">
                      <Icon size={24} />
                      <p className="ml-4 mb-2">{title}</p>
                    </Link>
                  </div>
                </>
              ))}
            </div>

            <div className="Category">
              <div className="flex justify-between px-3 pt-3 pb-2">
                <h6>Categorias</h6>
                <CategoryPopover action="Criar" />
              </div>
              <div className="fidex max-h-96 overflow-auto">
                <ul>
                  {categories &&
                    categories.map((categoria, index) => (
                      <Categoria key={index} categoriaId={categoria.id} nome={categoria.name} cor={categoria.color} />
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-t-[#9fadbc29] flex-shrink-0">
            <button onClick={handleLogout} className="text-xs text py-1 flex items-center">
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
