const ShiftCard = ({ shifts }) => {
  return (
    <div className="control-group">
      <div className="h-26 rounded-lg max-w-sm">
        <h3 className="text-lg text-gray-700 font-semibold">Turnos</h3>
        <div className="flex flex-col">
          {shifts.map((shift) => (
            <div className="w-full flex items-center" key={shift.shift}>
              <p className="w-1/4 text-gray-500 font-semibold">
                {shift.shift.charAt(0).toUpperCase() + shift.shift.slice(1)}
              </p>
              <div className="w-3/4">
                <div className="w-full bg-gray-400 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${shift.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    {shift.count} {shift.count <= 1 ? "tarefa" : "tarefas"}
                  </span>
                  <span>{shift.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;
