import { useReminder } from "../../contexts/ReminderContext";
import ReminderHeader from "./ReminderHeader";
import ReminderCard from "./ReminderCard";

function ReminderMain() {
  const { reminders } = useReminder();

  return (
    <div className="flex flex-col bg-white w-full">
      <ReminderHeader />
      <div className="w-full d-grid grid-cols-3 px-5 my-3 gap-5">
        <ReminderCard reminders={reminders} reminderType="shopping" />
        <ReminderCard reminders={reminders} reminderType="call" />
        <ReminderCard reminders={reminders} reminderType="meeting" />
      </div>
    </div>
  );
}

export default ReminderMain;
