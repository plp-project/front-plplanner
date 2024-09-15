import React, { useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import { useTask } from "../../contexts/TaskContext";

const Task = ({ key, task, day, month, year }) => {
	const [editingTask, setEditingTask] = useState(null);
	const [editName, setEditName] = useState("");
	const { removeTask, updateTask } = useTask();

	const handleEditClick = (task) => {
		setEditingTask(task);
		setEditName(task.name);
	};

	const handleDeleteTask = async () => {
		console.log(task);
		const planningDate = new Date(year, month - 1, day);
		await removeTask(planningDate, task.id);
	};

	const handleSaveEdit = async () => {
		if (editName.trim()) {
			const planningDate = new Date(year, month - 1, day);
			setEditingTask({ ...editingTask, description: editName });
			await updateTask(planningDate, editingTask);
			setEditingTask(null);
			setEditName("");
		}
	};

	const handleCancelEdit = () => {
		setEditingTask(null);
		setEditName("");
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<div
					key={task.id}
					className="flex justify-between items-center bg-white p-1 cursor-pointer rounded-lg hover:border-gray-500"
					style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
				>
					<span>{task.description}</span>
					<span>
						<button
							onClick={() => handleEditClick(task)}
							className="hover:bg-gray-600 p-1 rounded-sm"
						>
							<Edit2 size={16}></Edit2>
						</button>
					</span>
					<span>
						<button
							onClick={() => handleDeleteTask()}
							className="hover:bg-gray-600 p-1 rounded-sm"
						>
							<Trash2 size={16}></Trash2>
						</button>
					</span>
				</div>
			</div>

			{editingTask && (
				<div className="flex flex-col gap-2 p-2 border rounded-lg bg-gray-100">
					<input
						type="text"
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
						className="p-2 border rounded-md w-full"
					/>
					<div className="flex gap-2 w-full justify-between">
						<button
							onClick={handleSaveEdit}
							className="p-2 bg-blue-500 text-white rounded-md w-full"
						>
							Save
						</button>
						<button
							onClick={handleCancelEdit}
							className="p-2 bg-red-500 text-white rounded-md w-full"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Task;
