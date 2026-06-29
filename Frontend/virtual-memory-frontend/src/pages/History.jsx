import { useEffect, useState } from "react";
import api from "../services/api";

const History = () => {
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

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Simulation History</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Algorithm</th>
              <th className="p-3 text-left">Frames</th>
              <th className="p-3 text-left">Faults</th>
              <th className="p-3 text-left">Hits</th>
              <th className="p-3 text-left">Hit Ratio</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.algorithm}</td>
                <td className="p-3">{item.frames}</td>
                <td className="p-3">{item.page_faults}</td>
                <td className="p-3">{item.hits}</td>
                <td className="p-3">{item.hit_ratio}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
