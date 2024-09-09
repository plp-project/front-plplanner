import { createContext, useContext, useState } from "react";
import TaskService from "../services/TaskService";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);


export const TaskProvider = ({ children }) => {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = (day, month, year) => {
        if (taskName.trim()) {
            const newTask = {
                id: tasks.length + 1,
                name: taskName,
                day,
                month,
                year
            };
            setTasks([...tasks, newTask]);
            setTaskName('');
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, taskName, setTaskName }}>
            {children}
        </TaskContext.Provider>
    );
}
