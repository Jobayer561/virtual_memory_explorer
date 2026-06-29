import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AnalyticsChart = ({ result }) => {
  if (!result) return null;

  const data = [
    {
      name: "Metrics",
      Faults: result.page_faults,
      Hits: result.hits,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="Faults" />

          <Bar dataKey="Hits" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <p className="font-medium">Hit Ratio: {result.hit_ratio}%</p>
      </div>
    </div>
  );
};

export default AnalyticsChart;
