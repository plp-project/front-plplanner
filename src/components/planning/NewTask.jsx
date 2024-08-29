import React, { useState } from "react";
import { X, Plus } from "react-feather";
import { useTask } from "../../contexts/TaskContext";

const NewTask = () => {
  const [show, setShow] = useState(false);
  const { taskName, setTaskName, addTask } = useTask();

  const handleShowAndAddTask = () => {
    addTask()
    setShow(false);
  }

  return (
    <div>
      {show ? (
        <div>
          <textarea
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nome da Task"
            className="p-1 text-xs w-full rounded-md border-2 bg-zinc-300"
          />
          <div className="flex p-1">
            <button
              onClick={handleShowAndAddTask}
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
