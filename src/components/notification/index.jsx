import {
  Check,
  PhoneCall,
  ShoppingBag,
  Trash,
  Trash2,
  Users,
  X,
} from "react-feather";
import "./styles.css";

export const Notification = ({ type, title, description, onSubmit }) => {
  const notificationTypes = {
    call: "Ligações",
    meeting: "Reuniões",
    shopping: "Compras",
  };

  return (
    <div className="flex notificationContainer items-center h-64 my-2 ">
      <div className="flex items-center">
        {type === "call" && <PhoneCall size={24} className="text-gray-700" />}
        {type === "meeting" && <Users size={24} className="text-gray-700" />}
        {type === "shopping" && (
          <ShoppingBag size={24} className="text-gray-700" />
        )}
      </div>

      <div className="ml-2 flex-1">
        <p className="font-semibold text-gray-700">{notificationTypes[type]}</p>
        <p className="font-semibold text-gray-500">{description}</p>
      </div>

      <div>
        <button
          className="p-2 rounded-sm notificationButton"
          onClick={() => onSubmit()}
        >
          <Trash2 size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};
