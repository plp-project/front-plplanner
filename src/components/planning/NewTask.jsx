import React, { useState } from "react";
// import { useState } from "react";
import { X, Plus } from "react-feather";
import Task from './Task';

const NewTask = () => {

  const [task,setTask] = useState('');
  const [show,setShow] = useState(false);
  return (
    <div>
      <div className="flex flex-col">


        {show && 
        <div>
            <textarea name="" id="" cols="30" rows="" placeholder="Nome da Task" className="p-1 text-xs w-full rounded-md border-2 bg-zinc-300"></textarea>
            <div className="flex p-1">
                <button className="p-1 rounded bg-sky-600 text-white mr-2 ">Criar task</button>
                <button onClick={() => setShow(!show)} className="p-1 rounded hover:bg-gray-600"> <X size={16}></X></button>
            </div>
        </div>
        }

        {!show &&  
        <button onClick={() => setShow(!show)} className="flex w-full justify-center items-center gap-3">
            <Plus size={16}></Plus>Nova Task
        </button>
        }
      </div>
    </div>
  );
};

export default NewTask;
