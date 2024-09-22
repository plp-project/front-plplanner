import {
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} width={600} height={300}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" barSize={30} fill="#8884d8" />
      <Tooltip />
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
