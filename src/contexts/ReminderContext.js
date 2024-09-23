import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReminderService from "../services/ReminderService";
import { mapErrors } from "../helpers/languages";

const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({
    description: null,
    type: null,
    date: null,
  });

  function handleReminderErrors(data) {
    const errors = mapErrors(data);
    const message = Array.isArray(errors) ? errors[0] : errors;
    toast.error(message);
  }

  function changeInputFormData(input, value) {
    if (!(input in formData)) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [input]: value,
    }));
  }

  function validateFields() {
    if (formData.description == null)
      return toast.error("A descrição não pode ficar vazia.");
    if (formData.type == null)
      return toast.error("O tipo não pode ficar vazio.");
    if (formData.date == null)
      return toast.error("A data não pode ficar vazia.");
    if (formData.description.length < 3)
      return toast.error("A descrição deve ter mais de 3 caracteres.");
    if (formData.date == null)
      return toast.error("A data não pode ficar vazia.");
  }

  async function createReminder() {
    validateFields();
    try {
      const data = await ReminderService.create(formData);
      setReminders((prevReminders) => [...prevReminders, data]);
    } catch (error) {
      handleReminderErrors(error.response.data);
    }
  }

  async function editReminder(id) {
    validateFields();
    try {
      const data = await ReminderService.update(id, formData);
      const newRemind = { id: data.id, ...formData };
      setReminders((prevReminders) =>
        prevReminders.map((remind) => (remind.id === id ? newRemind : remind))
      );
    } catch (error) {
      handleReminderErrors(error.response.data);
    }
  }

  async function deleteReminder(id) {
    const newReminders = reminders.filter((remind) => remind.id !== id);

    if (newReminders.length === reminders.length)
      return toast.error("Não foi possível encontrar esse lembrete.");

    try {
      await ReminderService.delete(id);
      setReminders(newReminders);
    } catch (error) {
      handleReminderErrors(error.response.data);
    }
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

  useEffect(() => { }, []);

  console.log("formdata", formData);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        formData,
        editReminder,
        changeInputFormData,
        createReminder,
        deleteReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
