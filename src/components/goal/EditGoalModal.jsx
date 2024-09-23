import React, { useState } from "react";

const goalStatuses = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PARTIALLY_SUCCESS: 'partially_success',
  TODO: 'todo'
};

const EditGoalModal = ({ goal, closeModal, editGoal }) => {
  const [status, setStatus] = useState(goal.status || goalStatuses.TODO);

  const handleSave = () => {
    const updatedGoal = { ...goal, status };
    editGoal(updatedGoal);
    closeModal();
  };

  return (
    <div>
      <h3>Edit Goal</h3>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value={goalStatuses.SUCCESS}>Concluído</option>
          <option value={goalStatuses.FAILED}>Não Concluído</option>
          <option value={goalStatuses.PARTIALLY_SUCCESS}>Parcialmente Concluído</option>
          <option value={goalStatuses.TODO}>Não Iniciado</option>
        </select>
      </label>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default EditGoalModal;
