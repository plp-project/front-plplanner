import React from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import { usePlanning } from "../../contexts/PlanningContext";
import "./planejamento.css";

const Planejamento = ({ month, year, getTodayRef }) => {
  const { getPlanningByDate } = usePlanning();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date().getDate(); // Pegamos o dia atual

  const renderDays = () => {
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = String(day).padStart(2, "0");
      const dayOfWeek = new Date(year, month - 1, day).toLocaleDateString(
        "pt-BR",
        { weekday: "long" }
      );

      // Filtrando as tasks para o dia específico
      const date = new Date(year, month - 1, day);
      const filteredPlanning = getPlanningByDate(date);

      // Adicionamos uma referência especial ao dia atual
      const dayRef = day === today ? getTodayRef : null;

      days.push(
        <div
          key={day}
          ref={dayRef}
          className="mr-4 w-60 h-fit p-2 flex-shrink-0"
          style={{
            background: `#F3F5F6`,
            color: "#313131",
            fontFamily: `Open sans`,
            fontWeight: `600`,
            boxShadow: `0px 4px 4px 0px rgba(0, 0, 0, 0.25)`,
          }}
        >
          <div className="flex justify-between p-1 pb-2">
            <span>{`${formattedDay}/${String(month).padStart(
              2,
              "0"
            )} - ${dayOfWeek}`}</span>
          </div>
          <div className="list-body flex flex-col max-h-[72vh] gap-3 quadro-scroll overflow-auto pb-2">
            {filteredPlanning &&
              filteredPlanning.tasks &&
              filteredPlanning.tasks.map((task) => (
                <Task
                  key={`${task.description}#${task.id}`}
                  task={task}
                  day={day}
                  month={month}
                  year={year}
                />
              ))}
          </div>
          <NewTask day={day} month={month} year={year} />
        </div>
      );
    }
    return days;
  };

  return <div className="flex">{renderDays()}</div>;
};

export default Planejamento;
