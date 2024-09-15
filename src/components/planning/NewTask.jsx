import React, { useState } from "react";
import { X, Plus } from "react-feather";
import { useTask } from "../../contexts/TaskContext";
import { toast } from "react-toastify";

const NewTask = ({ day, month, year }) => {
	const [show, setShow] = useState(false);
	const { taskName, setTaskName, addTask } = useTask();

	const handleShowAndAddTask = () => {
		taskName.trim();
		if (taskName.length < 5)
			return toast.info("O nome da task deve ter mais de 5 caracteres.", {
				autoClose: 1500,
			});
		const planningDate = new Date(year, month - 1, day);
		addTask(planningDate);
		setShow(false);
		setTaskName("");
	};

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
