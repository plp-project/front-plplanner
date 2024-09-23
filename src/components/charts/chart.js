import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import moment from "moment/moment";

const formatWeek = (start, end) => {
  moment.locale("pt-br");
  const startDay = moment(start).format("D");
  const weekEnd = moment(end).format("D MMM  [de] YYYY");
  return `${startDay} a ${weekEnd}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { weekStart, weekEnd, value, name } = payload[0].payload;

    return (
      <div className="bg-white rounded-sm w-full p-2">
        {weekStart && weekEnd ? (
          <p className="label text-gray-500 font-semibold">{`${formatWeek(
            weekStart,
            weekEnd
          )}`}</p>
        ) : (
          <p className="label text-gray-600 font-semiBold">{`${label}`}</p>
        )}
        <p className="label text-gray-700 font-bold">{`${value} ${
          value > 1 ? "Executadas" : "Executada"
        }`}</p>
      </div>
    );
  }

  return null;
};

const CustomBarChart = ({ data, type }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} width={600} height={300}>
      {type === "week" ? (
        <XAxis
          dataKey={"weekStart"}
          tickFormatter={(start, index) => {
            const end = data[index].weekEnd;
            return formatWeek(start, end); // Formata o eixo X com a função formatWeek
          }}
        />
      ) : (
        <XAxis dataKey={"name"} />
      )}

      <YAxis />
      <Tooltip content={CustomTooltip} />
      <Bar dataKey="value" barSize={30} fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
