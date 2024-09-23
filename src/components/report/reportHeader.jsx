import { useReport } from "../../contexts/ReportContext";

function ReportHeader() {
  const { periodSelected, changePeriodSelected, date, changeDate } = useReport();

  const today = new Date(date).toISOString().split("T")[0];

  return (
    <div className="p-4 flex justify-between items-center w-full bg-opacity-50">
      <h1 className="text-2xl text-gray-600 font-bold my-2">Relatório</h1>

      <div className="flex items-center justify-center">
        <div>
          <label htmlFor="date" className="text-gray-700 text-md font-semibold mr-2">
            A partir de:{" "}
          </label>
          <input
            type="date"
            name="date"
            value={today}
            onChange={(e) => changeDate(e.target.value)}
            id="date-input"
            className="text-gray-700 text-md font-semibold bg-gray-100 p-3 rounded-md mr-4"
          />
        </div>

        <select
          value={periodSelected} // Controlado pelo estado
          defaultValue={"monthly"}
          onChange={(e) => changePeriodSelected(e.target.value)}
          className="bg-gray-100 p-3 rounded-md w-40 text-gray-700 font-semibold"
        >
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
          <option value="yearly">Anual</option>
        </select>
      </div>
    </div>
  );
}

export default ReportHeader;
