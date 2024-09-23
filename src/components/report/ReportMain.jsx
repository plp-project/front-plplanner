import { useReport } from "../../contexts/ReportContext";
import CustomBarChart from "../charts/chart";
import PizzaChart from "../charts/pizzaChart";
import ReportHeader from "./reportHeader";
import "./report.css";
import CardReport from "./cardReport";
import ShiftCard from "./shiftCard";

const ReportMain = () => {
  const {
    report,
    mostProductiveMonths,
    mostProductiveWeeks,
    taskCategories,
    goalCategories,
    shiftsMostProductive,
  } = useReport();

  const charts = [
    {
      component: PizzaChart,
      title: "Categorias(Tarefas) mais realizadas",
      data: taskCategories,
      size: "normal",
    },
    {
      component: PizzaChart,
      title: "Categorias(Metas) mais realizadas",
      data: goalCategories,
      size: "normal",
    },
    {
      component: CustomBarChart,
      title: "Meses mais produtivos",
      data: mostProductiveMonths,
      type: "month",
      size: "larger",
    },
    {
      component: CustomBarChart,
      title: "Semanas mais produtivas",
      data: mostProductiveWeeks,
      type: "week",
      size: "larger",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      <div>
        <ReportHeader />
      </div>
      <div className="w-full d-grid grid-cols-3 px-4">
        <CardReport
          title={"Tarefas realizadas"}
          percentage={report ? Math.ceil(report.tasks.percentage) : 0}
          explainContent={report ? `${report.tasks.finished} tarefas` : "0% "}
        />
        <CardReport
          title={"Metas cumpridas"}
          percentage={report ? Math.ceil(report.goals.percentage) : 0}
          explainContent={report ? `${report.goals.finished} metas` : "0% "}
        />
        <ShiftCard shifts={shiftsMostProductive.slice(0, 3)} />
      </div>

      <div className="d-grid h-full w-full grid-cols-4 grid-rows-2 px-4">
        {charts.map(
          ({ component: ChartComponent, title, data, size, type }, index) => (
            <div
              key={title}
              className={`d-flex flex-col items-center control-group ${
                size === "larger" && "col-span-2"
              }`}
            >
              <div className="">
                <p className="text-md text-center text-gray-700 font-bold">
                  {title}
                </p>
              </div>
              {data.length < 1 ? (
                <p className="w-3/4 text-center text-gray-600 font-semibold">
                  Não há informações suficientes para processar esse relatório
                </p>
              ) : (
                <ChartComponent data={data} type={type} />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReportMain;
