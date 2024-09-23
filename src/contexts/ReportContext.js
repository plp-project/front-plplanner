import React, { createContext, useContext, useState, useEffect } from "react";
import ReportService from "../services/ReportService";
import { toast } from "react-toastify";

const ReportContext = createContext();

export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [report, setReport] = useState(null);
  const [date, setDate] = useState(new Date());
  const [periodSelected, setPeriodSelected] = useState("monthly");

  const taskCategories = report
    ? report.tasks.categories.mostFinished.map(({ category, count }) => ({
      name: category.name,
      color: category.color,
      value: count,
      quantity: count,
    }))
    : [];

  const goalCategories = report
    ? report.goals.categories.mostFinished.map(({ category, count }) => ({
      name: category.name,
      color: category.color,
      value: count,
      quantity: count,
    }))
    : [];

  const mostProductiveMonths = report
    ? report.mostProductive.months.map((month) => ({
      name: month.month,
      value: Number(month ? month.count : 0),
    }))
    : [];

  const mostProductiveWeeks = report
    ? report.mostProductive.weeks.map(({ count, week }) => ({
      name: week.weekOfYear,
      weekStart: week.start,
      weekEnd: week.end,
      value: Number(count),
    }))
    : [];

  const defaultShifts = [
    { shift: "afternoon", labelName: "Tarde", count: 0, percentage: 0 },
    { shift: "morning", labelName: "Manhã", count: 0, percentage: 0 },
    { shift: "night", labelName: "Noite", count: 0, percentage: 0 },
    { shift: "1h", labelName: "1h", count: 0, percentage: 0 },
    { shift: "30m", labelName: "30m", count: 0, percentage: 0 },
  ];

  let shiftsMostProductive = report
    ? defaultShifts.map((defaultShift) => {
      const foundShift = report.mostProductive.shifts.find(
        (shift) => shift.shift === defaultShift.shift
      );
      return {
        ...defaultShift,
        count: foundShift ? foundShift.count : 0,
        percentage: Math.ceil(
          (foundShift ? foundShift.count / report.tasks.all : 0) * 100
        ),
      };
    })
    : defaultShifts;

  shiftsMostProductive.sort((a, b) => b.count - a.count);

  useEffect(() => {
    const fetchReport = async (date) => {
      const data = await ReportService.create(date, periodSelected);
      if (data.errors)
        return toast.error("Houve um erro gerando seu relatório.");
      setReport(data);
    };
    fetchReport(date);
  }, [periodSelected, date]);

  function changePeriodSelected(period) {
    const validValues = ["monthly", "weekly", "yearly"];
    if (validValues.indexOf(period) === -1) return;
    setPeriodSelected(period);
  }

  function changeDate(date) {
    setDate(date);
  }

  console.log("Conteúdo de report: ", report);

  return (
    <ReportContext.Provider
      value={{
        report,
        date,
        changePeriodSelected,
        changeDate,
        taskCategories,
        goalCategories,
        mostProductiveMonths,
        shiftsMostProductive,
        mostProductiveWeeks,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
