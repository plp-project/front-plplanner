import { useReport } from "../../contexts/ReportContext";
import CustomBarChart from "../charts/chart";
import ReportHeader from "./reportHeader";
import "./report.css";
import CardReport from "./cardReport";
import ShiftCard from "./shiftCard";

const ReportMain = () => {
  const {
    report,
    mostProductiveWeek,
    taskCategories,
    goalCategories,
    shiftsMostProductive,
  } = useReport();

  const charts = [
    {
      component: CustomBarChart,
      title: "Meses mais produtivos",
      data: mostProductiveWeek,
    },
    {
      component: CustomBarChart,
      title: "Categorias(Tarefas) mais realizadas",
      data: taskCategories,
    },
    {
      component: CustomBarChart,
      title: "Categorias(Metas) mais realizadas",
      data: goalCategories,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white w-full">
      <div>
        <ReportHeader />
      </div>
      <div className="w-full d-grid grid-cols-3 px-4 my-3 ">
        <CardReport
          title={"Tarefas realizadas"}
          percentage={report ? report.tasks.percentage : 0}
          explainContent={report ? `${report.tasks.finished} tarefas` : "0% "}
        />
        <CardReport
          title={"Metas cumpridas"}
          percentage={report ? `${report.goals.percentage}%` : "0% "}
          explainContent={report ? `${report.goals.finished} metas` : "0% "}
        />
        <ShiftCard shifts={shiftsMostProductive.slice(0, 3)} />
      </div>

      <div className="d-grid h-full w-full grid-cols-3 grid-rows-2 px-4">
        {charts.map(({ component: ChartComponent, title, data }, index) => (
          <div
            className={`d-flex flex-col items-center control-group ${
              index === 0 ? "col-span-2" : ""
            }`}
          >
            <div className="">
              <p className="text-md text-center text-gray-700 font-bold">
                {title}
              </p>
            </div>
            {data.length < 1 ? (
              <p className="w-3/4 text-center text-gray-600 font-semibold">
                Não temos informações suficientes para processar esse relatório
              </p>
            ) : (
              <ChartComponent data={data} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportMain;
