import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  const totalSimulations = history.length;

  const averageHitRatio =
    history.length > 0
      ? (
          history.reduce((sum, item) => sum + item.hit_ratio, 0) /
          history.length
        ).toFixed(2)
      : 0;

  const averageFaults =
    history.length > 0
      ? (
          history.reduce((sum, item) => sum + item.page_faults, 0) /
          history.length
        ).toFixed(2)
      : 0;

  const chartData = history.map((item) => ({
    id: `Run ${item.id}`,
    faults: item.page_faults,
    hits: item.hits,
  }));

  // FIFO
  const fifoRuns = history.filter(
    (item) => item.algorithm.toUpperCase() === "FIFO",
  );

  // LRU
  const lruRuns = history.filter(
    (item) => item.algorithm.toUpperCase() === "LRU",
  );

  // OPTIMAL
  const optimalRuns = history.filter(
    (item) => item.algorithm.toUpperCase() === "OPTIMAL",
  );

  const fifoAverageHitRatio =
    fifoRuns.length > 0
      ? (
          fifoRuns.reduce((sum, item) => sum + item.hit_ratio, 0) /
          fifoRuns.length
        ).toFixed(2)
      : 0;

  const lruAverageHitRatio =
    lruRuns.length > 0
      ? (
          lruRuns.reduce((sum, item) => sum + item.hit_ratio, 0) /
          lruRuns.length
        ).toFixed(2)
      : 0;

  const optimalAverageHitRatio =
    optimalRuns.length > 0
      ? (
          optimalRuns.reduce((sum, item) => sum + item.hit_ratio, 0) /
          optimalRuns.length
        ).toFixed(2)
      : 0;

  const comparisonData = [
    {
      algorithm: "FIFO",
      hitRatio: Number(fifoAverageHitRatio),
    },
    {
      algorithm: "LRU",
      hitRatio: Number(lruAverageHitRatio),
    },
    {
      algorithm: "OPTIMAL",
      hitRatio: Number(optimalAverageHitRatio),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Simulations</h3>

          <p className="text-3xl font-bold">{totalSimulations}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Average Hit Ratio</h3>

          <p className="text-3xl font-bold">{averageHitRatio}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Average Page Faults</h3>

          <p className="text-3xl font-bold">{averageFaults}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Faults vs Hits</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="id" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="faults" name="Page Faults" />

            <Bar dataKey="hits" name="Hits" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">
          FIFO vs LRU vs OPTIMAL Average Hit Ratio
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="algorithm" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="hitRatio" name="Average Hit Ratio (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
