import React, { useState } from "react";
import { X, Plus } from "react-feather";

const NewTask = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [show, setShow] = useState(false);

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask('');
      setShow(false);
    }
  };

  return (
    <div>
      {show ? (
        <div>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Nome da Task"
            className="p-1 text-xs w-full rounded-md border-2 bg-zinc-300"
          />
          <div className="flex p-1">
            <button
              onClick={handleAddTask}
              className="p-1 rounded bg-sky-600 text-white mr-2"
            >
              Criar task
            </button>
            <button
              onClick={() => setShow(!show)}
              className="p-1 rounded hover:bg-gray-600"
            >
              <X size={16}></X>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShow(!show)}
          className="flex w-full justify-center items-center gap-3"
        >
          <Plus size={16}></Plus>Nova Task
        </button>
      )}
    </div>
  );
};

export default NewTask;
