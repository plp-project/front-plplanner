import { Calendar, Edit, Trash2 } from "react-feather";
import moment from "moment/moment";

const ReminderItem = ({ reminder, handleEditModal, deleteReminder }) => {
  return (
    <div
      key={reminder.id}
      className="flex justify-between items-center px-4 py-2 my-1 bg-white rounded-lg"
      style={{ boxShadow: `0px 7px 0px 0px rgba(0, 0, 0, 0.15)` }}
    >
      <div className="flex flex-col my-1 gap-2">
        <span className="font-semibold break-all text-base" style={{}}>
          {reminder.description}
        </span>
        <span className="text-sm text-gray-500 gap-1 flex items-center">
          <Calendar size={14} />{" "}
          {moment(reminder.date).locale("pt-br").format("DD/MM/YYYY")}
        </span>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => handleEditModal(reminder)}
          className="hover:bg-gray-300 p-1 rounded-sm"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => deleteReminder(reminder.id)}
          className="hover:bg-gray-300 p-1 rounded-sm"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReminderItem;
