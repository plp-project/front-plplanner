const TaskService = {
    findAll: async () => {
        const data = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Doe' },
                ]);
            }, 1000);
        })
        return await data;
    }
}


export default TaskService;