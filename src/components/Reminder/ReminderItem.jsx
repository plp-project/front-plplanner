import { Edit, Trash2 } from "react-feather";

const ReminderItem = ({ reminder, handleEditModal, deleteReminder }) => {
  return (
    <div className="flex justify-between items-center bg-white p-2 my-2 rounded-lg shadow-sm">
      <p>{reminder.description}</p>
      <p>{new Date(reminder.date).toLocaleDateString("pt-BR")}</p>
      <div className="flex align-middle gap-1">
        <button onClick={() => handleEditModal(reminder)} className="hover:bg-gray-300 p-1 rounded-sm">
          <Edit size={20} />
        </button>
        <button onClick={() => deleteReminder(reminder.id)} className="hover:bg-gray-300 p-1 rounded-sm">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReminderItem;
