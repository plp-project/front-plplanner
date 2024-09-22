import Header from "../../components/planning/Header";
import Main from "../../components/planning/Main";
import Sidebar from "../../components/planning/Sidebar";
import ReportMain from "../../components/report/ReportMain";
import "./styles.css";

const Reports = () => {
  return (
    <div>
      <Header></Header>
      <div className="content flex">
        <Sidebar></Sidebar>
        <ReportMain />
      </div>
    </div>
  );
};

export default Reports;
