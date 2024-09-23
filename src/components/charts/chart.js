import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer,
} from "recharts";
import moment from "moment/moment";

const CustomTooltip = ({ active, payload, label }) => {
	const formatWeek = (start, end) => {
		moment.locale("pt-br");
		const startDay = moment(start).format("D");
		const weekEnd = moment(end).format("MMM D, YYYY");
		return `${startDay} - ${weekEnd}`;
	};
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
					value > 1 ? "Tarefas" : "Tarefa"
				}`}</p>
			</div>
		);
	}

	return null;
};

const CustomBarChart = ({ data }) => (
	<ResponsiveContainer width="100%" height="100%">
		<BarChart data={data} width={600} height={300}>
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip content={CustomTooltip} />
			<Bar dataKey="value" barSize={30} fill="#8884d8" />
		</BarChart>
	</ResponsiveContainer>
);

export default CustomBarChart;
