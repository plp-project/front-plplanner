import { useState } from "react";
import Modal from "../planning/Modal";
import { useReminder } from "../../contexts/ReminderContext";
import { Edit, Trash2 } from "react-feather";

function ReminderMain() {
  const {
    formData,
    changeInputFormData,
    reminders,
    createNewReminder,
    deleteReminder,
    editReminder,
  } = useReminder();
  const [showModal, setShowModal] = useState(false);
  const [reminderSelected, setReminderSelected] = useState(null);

  function handleCreateSubmit(e) {
    e.preventDefault();
    createNewReminder();
    setShowModal(false);
  }

  function handleEditModal(remind) {
    changeInputFormData("description", remind.description);
    changeInputFormData("type", remind.type);
    changeInputFormData("date", remind.date);
    setReminderSelected(remind);
    setShowModal(true);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    editReminder(reminderSelected.id);
    setReminderSelected(null);
    setShowModal(false);
  }

  function handleCloseModal() {
    setReminderSelected(null);
    setShowModal(false);
  }

  return (
    <div className="flex flex-col w-full bg-white w-full">
      <div>
        <h3>Lembretes</h3>

        {reminders.map((remind) => (
          <div className="d-flex p-4">
            <p>{remind.description}</p>
            <p>{remind.type}</p>
            <p>{remind.date}</p>
            <button onClick={() => handleEditModal(remind)}>
              <Edit />
            </button>
            <button onClick={() => deleteReminder(remind.id)}>
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      <button className="text-black w-24 " onClick={() => setShowModal(true)}>
        Adicionar Lembrete
      </button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="flex flex-col gap-3">
          <div class="border-b pb-3">
            <h3 class="text-xl font-medium">Novo lembrete</h3>
          </div>
          <div className="mt-2 ">
            <label className="block text-xs text-left">Descrição</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                changeInputFormData("description", e.target.value)
              }
              placeholder="Insira a descrição"
              className="p-1 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
            />
          </div>

          <div className="mt-2 ">
            <label className="text-xs block text-left">Tipo</label>
            <select
              className="p-2 pr-3 text-xs w-full h-10 rounded-md border-2 bg-zinc-300"
              value={formData.type}
              onChange={(e) => changeInputFormData("type", e.target.value)}
            >
              <option value="call">Chamadas</option>
              <option value="meeting">Encontro</option>
              <option value="shopping">Compras</option>
            </select>
          </div>

          <div className="mt-2">
            <label className="text-xs block text-left">Dia</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => changeInputFormData("date", e.target.value)}
            />
          </div>

          <div className="flex p-1 mt-2">
            <button
              className="p-2 rounded bg-[#00585E] text-white mr-2"
              onClick={(e) =>
                reminderSelected ? handleEditSubmit(e) : handleCreateSubmit(e)
              }
            >
              {reminderSelected ? "Editar lembrete" : "Criar lembrete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ReminderMain;
