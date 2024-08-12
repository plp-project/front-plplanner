import { Collapse } from "bootstrap";
import React from "react";
import { ChevronRight, ChevronLeft, Plus } from "react-feather";

const Sidebar = () => {
  const [collapsed, setcollapsed] = React.useState(false);
  return (
    <div
      className={`bg-[#00585E] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[42px]" : "w-[280px]"
      }`}
    >
      {collapsed && 
        <div className="p-2">
          <button
            onClick={() => setcollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm p-1"
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      }
      {!collapsed && 
        <div>
          <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
          <div className="right flex items-center space-x-4"> 

                <img className='rounded-full' src="https://placehold.co/28x28/png" alt="" />

                <div className='content-flex flex-col'>
                  <span className='text-sm w-full'>Rafael Alves</span>
                  <br />
                  <span className="text-xs">rafael@email.com</span>
                </div>
                
            </div>
            <button
              onClick={() => setcollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="Category">
            <div className="flex justify-between px-3 py-2">
              <h6> Categorias </h6>
              <button className="hover:bg-slate-600 p-1 rounded-sm">
                <Plus size={16}></Plus>
              </button>
            </div>
          </div>
          <ul>
            <li>
                <button className=" items-center px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500 ">
                    <span className="w-6 h-6 rounded-sm mr-2 bg-red-400">
                        &nbsp;
                    </span>
                    <span>Categoria 1</span>
                </button>
            </li>

          </ul>
        </div>
      }
    </div>
  );
};

export default Sidebar;
