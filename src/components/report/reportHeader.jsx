import { useReport } from "../../contexts/ReportContext";

function ReportHeader() {
  const { periodSelected, changePeriodSelected } = useReport();

  return (
    <div className="p-4 flex justify-between items-center w-full bg-opacity-50">
      <h1 className="text-2xl text-gray-600 font-bold my-2">Relatório</h1>

      <select
        defaultValue={periodSelected}
        onChange={(e) => changePeriodSelected(e.target.value)}
        className="bg-gray-300 p-2 rounded-md w-40 text-gray-700 font-semibold"
      >
        <option value="weekly">Essa semana</option>
        <option value="monthly">Esse mês</option>
        <option value="yearly">Esse ano</option>
      </select>
    </div>
  );
}

export default ReportHeader;
