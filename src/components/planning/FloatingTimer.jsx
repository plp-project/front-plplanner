import React from "react";
import { X, Check, Clock, Pause } from "react-feather";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FloatingTimer = ({
  time,
  onClose,
  onFinishTask,
  onPostponeTask,
  totalDuration,
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const progress = ((totalDuration - time) / totalDuration) * 100;

  return (
    <div
      className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
        width: "350px", // Tamanho ajustado
        height: "250px", // Tamanho ajustado
        borderRadius: "20px", // Bordas arredondadas
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Barra de progresso circular */}
        <div style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            value={progress}
            text={formatTime(time)}
            styles={buildStyles({
              textSize: "16px",
              pathColor: time > 600 ? "#4CAF50" : "#FF5722",
              textColor: "#333",
              trailColor: "#ddd",
            })}
          />
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2">
        {/* Botão de adiar */}
        <button
          onClick={onPostponeTask}
          className="text-yellow-500 p-2 rounded-md hover:bg-yellow-600 hover:text-white flex flex-row items-center align-middle gap-1"
          title="Adiar Tarefa"
        >
          <Pause size={24} /> Adiar Tarefa
        </button>

        {/* Botão de finalizar */}
        <button
          onClick={onFinishTask}
          className="text-green-500 p-2 rounded-md hover:bg-green-600 hover:text-white items-center flex flex-row align-middle gap-1"
          title="Finalizar Tarefa"
        >
          <Check size={24} /> Finalizar tarefa
        </button>

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-950 hover:bg-red-200 p-2 rounded-md items-center flex flex-row align-middle gap-1"
          title="Fechar Timer"
        >
          <X size={24} color="red" /> Cancelar tarefa
        </button>
      </div>
    </div>
  );
};

export default FloatingTimer;
