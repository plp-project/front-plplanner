import React, { createContext, useContext, useState, useEffect } from "react";
import ReportService from "../services/ReportService";
import { toast } from "react-toastify";

const ReportContext = createContext();

export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [periodSelected, setPeriodSelected] = useState("monthly");

  useEffect(() => {
    const fetchReport = async (date) => {
      const data = await ReportService.create(date, periodSelected);
      if (data.errors)
        return toast.error("Houve um erro gerando seu relatório.");
      setReport(data);
    };
    fetchReport(new Date());
  }, [periodSelected]);

  function changePeriodSelected(period) {
    const validValues = ["monthly", "weekly", "yearly"];
    if (validValues.indexOf(period) === -1) return;
    setPeriodSelected(period);
  }

  console.log("Conteúdo de report: ", report);

  return (
    <ReportContext.Provider value={{ report, changePeriodSelected }}>
      {children}
    </ReportContext.Provider>
  );
};
