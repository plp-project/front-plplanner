import React, { useState } from "react";
import { Bell } from "react-feather";
import { useReminder } from "../../contexts/ReminderContext";
import { Notification } from "../notification";

const SecondHeader = ({ month, year, setMonth, setYear }) => {
  const { notifications, deleteReminder } = useReminder();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="p-3 flex justify-between items-center w-full bg-opacity-50 border-b-2">
      <div className="flex space-x-2">
        <select
          value={month}
          onChange={handleMonthChange}
          className="text font-semibold text-xl"
          style={{ color: "#00585E" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={handleYearChange}
          className="text font-semibold text-xl"
          style={{ color: "#00585E" }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
      </div>

      <div className="relative mr-8">
        <button onClick={toggleNotifications} className="relative">
          <Bell size={24} className="text-gray-800" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4">
              <h3 className="text-sm text-gray-600 font-bold">
                Notificações ({notifications.length})
              </h3>
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  type={notification.type}
                  description={notification.description}
                  onSubmit={() => deleteReminder(notification.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondHeader;
