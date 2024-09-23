import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReminderService from "../services/ReminderService";
import { mapErrors } from "../helpers/languages";
import { useAuth } from "./AuthContext";

const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);
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
    if (!user) return;
    validateFields();
    try {
      const data = await ReminderService.create(formData);
      setReminders((prevReminders) => [...prevReminders, data]);
    } catch (error) {
      handleReminderErrors(error.response.data);
    }
  }

  async function editReminder(id) {
    if (!user) return;
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

  async function deleteNotification(id) {
    if (!user) return;
    const newNotifications = notifications.filter((remind) => remind.id !== id);
    setNotifications(newNotifications);
  }

  async function deleteReminder(id) {
    if (!user) return;
    const newReminders = reminders.filter((remind) => remind.id !== id);

    if (newReminders.length === reminders.length)
      return toast.error("Não foi possível encontrar esse lembrete.");

    try {
      await ReminderService.delete(id);
      setReminders(newReminders);
      deleteNotification(id);
    } catch (error) {
      handleReminderErrors(error.response.data);
    }
  }

  useEffect(() => {
    if (!user) return;
    const fetchReminders = async () => {
      const data = await ReminderService.getAllByUser();

      if (data.errors)
        return toast.error("Não foi possível encontrar seus lembretes.");

      setReminders(data);
    };

    fetchReminders();
  }, [user]);

  const isToday = (date2) => {
    const today = new Date();
    return (
      today.getDate() === date2.getDate() &&
      today.getMonth() === date2.getMonth() &&
      today.getFullYear() === date2.getFullYear()
    );
  };

  useEffect(() => {
    if (!user) return;
    const remindersToday = reminders.filter((remind) => {
      const remindDate = new Date(remind.date);
      return isToday(remindDate);
    });
    if (remindersToday.length > 0) {
      setNotifications(remindersToday);
    }
  }, [user, reminders]);

  console.log("reminders: ", reminders);
  console.log("formData: ", formData);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        formData,
        notifications,
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
