import { createContext, useContext, useState } from "react";
import TaskService from "../services/TaskService";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);


export const TaskProvider = ({ children}) => {
    const [taskName, setTaskName] = useState("")
    const [tasks, setTasks] = useState([]);

    async function getAllTasks() {
        return await TaskService.findAll();
    }

    const addTask = () => {
        if (taskName.trim()) {
            const name = taskName;
            setTasks([...tasks, { id: tasks.length + 1, name }]);
            setTaskName('');
        }
      };
    
    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, taskName, setTaskName }}>
            {children}
        </TaskContext.Provider>
    );
}