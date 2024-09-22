import { useReport } from "../../contexts/ReportContext";
import CustomBarChart from "../charts/chart";
import CustomLineChart from "../charts/lineChart";
import PizzaChart from "../charts/pizzaChart";
import CustomRadarChart from "../charts/radarChart";
import ReportHeader from "./reportHeader";
import "./report.css";
import CardReport from "./cardReport";
import ShiftCard from "./shiftCard";

const ReportMain = () => {
  const { report } = useReport();

  const tarefasExecutadas = [
    {
      name: "Não executadas",
      value: Number(report ? 100 - report.tasks.percentage : 0),
      quantity: Number(report ? report.tasks.all - report.tasks.finished : 0),
    },
    {
      name: "Executadas",
      value: Number(report ? report.tasks.percentage : 0),
      quantity: Number(report ? report.tasks.finished : 0),
    },
  ];

  const metasCumpridas = [
    {
      name: "Não Cumpridas",
      value: Number(report ? 100 - report.goals.percentage : 0),
      quantity: Number(report ? report.tasks.all - report.tasks.finished : 0),
    },
    {
      name: "Executadas",
      value: Number(report ? report.goals.percentage : 0),
      quantity: Number(report ? report.tasks.finished : 0),
    },
  ];

  const categoriasTarefas = report
    ? report.tasks.categories.mostFinished.map((item) => ({
        name: item.category,
        value: item.count,
      }))
    : [];

  const categoriasMetas = report
    ? report.goals.categories.mostFinished.map((item) => ({
        name: item.category,
        value: item.count,
      }))
    : [];

  const turnosMaisProdutivos = report
    ? report.mostProductive.shifts.map((shift) => ({
        name: shift.shift,
        value: Number(shift ? shift.count : 0),
        quantity: Number(shift ? shift.count : 0),
      }))
    : [];

  const semanasMaisProdutivas = report
    ? report.mostProductive.months.map((month) => ({
        name: month.month,
        value: Number(month ? month.count : 0),
      }))
    : [];

  const defaultShifts = [
    { shift: "tarde", count: 0, percentage: 0 },
    { shift: "manhã", count: 0, percentage: 0 },
    { shift: "noite", count: 0, percentage: 0 },
    { shift: "1h", count: 0, percentage: 0 },
    { shift: "30m", count: 0, percentage: 0 },
  ];

  let shiftsMostProductive = report
    ? defaultShifts.map((defaultShift) => {
        const foundShift = report.mostProductive.shifts.find(
          (shift) => shift.shift === defaultShift.shift
        );
        return {
          ...defaultShift,
          count: foundShift ? foundShift.count : 0,
          percentage:
            (foundShift ? foundShift.count / report.tasks.all : 0) * 100,
        };
      })
    : defaultShifts;

  shiftsMostProductive.sort((a, b) => b.count - a.count);

  const charts = [
    {
      component: CustomBarChart,
      title: "Meses mais produtivos",
      data: semanasMaisProdutivas,
    },
    {
      component: CustomBarChart,
      title: "Categorias(Tarefas) mais realizadas",
      data: categoriasTarefas,
    },
    {
      component: CustomBarChart,
      title: "Categorias(Metas) mais realizadas",
      data: categoriasMetas,
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
          <div className="d-flex flex-col items-center control-group">
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
