import { Plus } from "react-feather";
import { useReminder } from "../../contexts/ReminderContext";
import { useState } from "react";
import Modal from "../planning/Modal";
import ReminderForm from "./ReminderForm";
import ReminderItem from "./ReminderItem";

const ReminderCard = ({ reminders, reminderType }) => {
  const { formData, changeInputFormData, createReminder, editReminder, deleteReminder } = useReminder();
  const [showModal, setShowModal] = useState(false);
  const [reminderSelected, setReminderSelected] = useState(null);

  function handleCreateSubmit(e) {
    e.preventDefault();
    createReminder();
    handleCloseModal();
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    editReminder(reminderSelected.id);
    handleCloseModal();
  }

  function handleCloseModal() {
    changeInputFormData("description", null);
    changeInputFormData("type", null);
    changeInputFormData("date", null);
    setReminderSelected(null);
    setShowModal(false);
  }

  function handleEditModal(remind) {
    changeInputFormData("description", remind.description);
    changeInputFormData("type", remind.type);
    changeInputFormData("date", remind.date);
    setReminderSelected(remind);
    setShowModal(true);
  }

  const reminderTypeMap = {
    call: "Ligações",
    meeting: "Reuniões",
    shopping: "Compras",
  };

  const reminderLabel = reminderTypeMap[reminderType] || reminderType;

  return (
    <div className="bg-gray-100 flex flex-col text-gray-800 font-semibold shadow-md p-4 rounded-sm">
      <span className="font-bold">{reminderLabel}</span>

      <button className="flex w-full justify-center items-center gap-2 mt-3 mb-2" onClick={() => setShowModal(true)}>
        <Plus size={16} />
        <span>Novo Lembrete</span>
      </button>

      {reminders
        .filter((reminder) => reminder.type === reminderType)
        .map((reminder) => (
          <ul>
            <ReminderItem
              key={reminder.id}
              reminder={reminder}
              reminderType={reminderLabel}
              handleEditModal={handleEditModal}
              deleteReminder={deleteReminder}
            />
          </ul>
        ))}

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="flex flex-col gap-3 text-black">
          <div class="border-b pb-3">
            <h3 class="text-xl font-bold text-[#00585E]">{reminderSelected ? "Editar lembrete" : "Novo lembrete"}</h3>
          </div>

          <ReminderForm formData={formData} setFormData={changeInputFormData} />

          <div className="flex p-1 mt-3">
            <button
              className="p-2 rounded bg-[#00585E] text-white mr-2"
              onClick={(e) => (reminderSelected ? handleEditSubmit(e) : handleCreateSubmit(e))}
            >
              {reminderSelected ? "Editar lembrete" : "Criar lembrete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReminderCard;
