const ReminderForm = ({ formData, setFormData, reminderType }) => {
  formData.type = formData.type || reminderType;

  return (
    <div className="reminder-form">
      <div className="mt-3">
        <label className="block text-left font-medium text-[#00585E] pt-1">Descrição</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData("description", e.target.value)}
          placeholder="Insira a descrição"
          className="border-1 border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all outline-none"
        />
      </div>

      <div className="mt-3">
        <label className="block text-left font-medium text-[#00585E] pt-1">Tipo</label>
        <select
          className="border-1 border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all outline-none"
          value={formData.type}
          onChange={(e) => setFormData("type", e.target.value)}
        >
          <option value="">Selecione o tipo</option>
          <option value="shopping">Compras</option>
          <option value="call">Ligações</option>
          <option value="meeting">Reuniões</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="block text-left font-medium text-[#00585E] pt-1">Data</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData("date", e.target.value)}
          className="border-1 border-gray-300 focus:border-[#00585E] rounded-lg w-full p-2 mt-1 transition-all outline-none"
        />
      </div>
    </div>
  );
};

export default ReminderForm;
