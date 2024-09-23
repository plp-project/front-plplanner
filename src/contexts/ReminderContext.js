import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReminderService from "../services/ReminderService";

const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    type: "call",
    date: null,
  });

  function changeInputFormData(input, value) {
    if (!(input in formData)) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [input]: value,
    }));
  }

  function validateFields() {
    if (formData.description.length < 5)
      return toast.error("A descrição deve ter mais de 5 caracteres.");
    if (formData.date == null)
      return toast.error("A data não pode ficar vazia.");
  }

  async function createNewReminder() {
    validateFields();
    const data = await ReminderService.create(formData);
    if (data.errors) return toast.error("Algo deu errado");
    setReminders((prevReminders) => [...prevReminders, data]);
  }

  async function editReminder(id) {
    validateFields();
    const data = await ReminderService.update(id, formData);
    if (data.errors) return toast.error("Algo deu errado");
    const newRemind = { id: data.id, ...formData };
    setReminders((prevReminders) =>
      prevReminders.map((remind) => (remind.id === id ? newRemind : remind))
    );
  }

  async function deleteReminder(id) {
    const newReminders = reminders.filter((remind) => remind.id !== id);

    if (newReminders.length === reminders.length)
      return toast.error("Não foi possível encontrar esse lembrete.");

    const data = await ReminderService.delete(id);

    if (data.errors) return toast.error("Algo deu errado");

    setReminders(newReminders);
  }

  useEffect(() => {
    const fetchReminders = async () => {
      const data = await ReminderService.getAllByUser();

      if (data.errors)
        return toast.error("Não foi possível encontrar seus lembretes.");

      setReminders(data);
    };

    fetchReminders();
  }, []);

  useEffect(() => {}, []);

  console.log("formdata", formData);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        formData,
        editReminder,
        changeInputFormData,
        createNewReminder,
        deleteReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
