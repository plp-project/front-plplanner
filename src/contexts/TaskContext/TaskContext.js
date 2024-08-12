// import { useContext, useState } from "react";
// import TaskService from "../../services/TaskService";

// const TaskContext = useContext();

// export const TaskProvider = () => {
//     const tasks = useState([]);

//     async function getAllTasks() {
//         // logica de negocio

//         return await TaskService.findAll();
//     }
    
//     return (
//         <TaskContext.Provider value={{ tasks: [] }}>
//             {children}
//         </TaskContext.Provider>
//     );
// }