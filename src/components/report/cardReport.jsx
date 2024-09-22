import { AlertTriangle, CheckCircle } from "react-feather";

const CardReport = ({ title, percentage, explainContent }) => {
  return (
    <div className="control-group">
      <div className="w-full h-26 text-left">
        <h3 className="text-lg text-gray-700 font-semibold">{title}</h3>
        <div className="d-flex justify-between">
          <div className="d-flex flex-col h-3/6">
            <h4 className="text-3xl text-gray-600 font-bold">{percentage}</h4>
            <h3 className="text-md text-gray-600 font-normal">
              {explainContent}
            </h3>
          </div>
          <div>
            {percentage >= 50 ? (
              <CheckCircle size={48} className="text-green-700 mr-4" />
            ) : (
              <AlertTriangle size={48} className="text-red-500 mr-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReport;
