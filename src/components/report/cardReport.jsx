import { AlertTriangle, CheckCircle } from "react-feather";

const CardReport = ({ title, percentage, explainContent }) => {
  function getClassColorByPercentage() {
    if (percentage >= 50) return "control-group-success";
    else if (percentage <= 50 && percentage >= 20)
      return "control-group-warning";
    else if (percentage < 20) return "control-group-danger";
  }

  return (
    <div className={`control-group ${getClassColorByPercentage()}`}>
      <div className="w-full h-26 text-left">
        <h3 className="text-lg text-gray-700 font-semibold">{title}</h3>
        <div className="d-flex justify-between">
          <div className="d-flex flex-col h-3/6">
            <h4 className="text-3xl text-gray-600 font-bold">{percentage}%</h4>
            <h3 className="text-md text-gray-600 font-normal">
              {explainContent}
            </h3>
          </div>
          <div>
            {percentage >= 50 ? (
              <CheckCircle size={48} className="text-green-700 mr-4" />
            ) : percentage <= 50 && percentage >= 20 ? (
              <AlertTriangle size={48} className="text-yellow-500 mr-4" />
            ) : (
              percentage < 20 && (
                <AlertTriangle size={48} className="text-red-500 mr-4" />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReport;
