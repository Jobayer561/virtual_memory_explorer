import { useEffect, useState } from "react";
import api from "../services/api";

const PhysicalMemory = () => {
  const [simulation, setSimulation] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const response = await api.get("/latest-simulation");
        setSimulation(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSimulation();
  }, []);

  if (!simulation) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Physical Memory Manager</h1>

        <p>No simulation available.</p>
      </div>
    );
  }

  const history = simulation.frame_history;
  const currentFrames = history[step];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Physical Memory Manager</h1>

      {/* Simulation Info */}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-3">Simulation Details</h2>

          <p>
            <strong>Algorithm:</strong> {simulation.algorithm}
          </p>

          <p>
            <strong>Frames:</strong> {simulation.frames}
          </p>

          <p className="mt-3">
            <strong>Reference String</strong>
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {simulation.reference_string.map((page, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 rounded">
                {page}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-3">Statistics</h2>

          <p>
            <strong>Page Faults:</strong> {simulation.page_faults}
          </p>

          <p>
            <strong>Hits:</strong> {simulation.hits}
          </p>

          <p>
            <strong>Hit Ratio:</strong> {simulation.hit_ratio}%
          </p>
        </div>
      </div>

      {/* Step Controls */}

      <div className="flex justify-between items-center mb-4">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <h2 className="text-xl font-bold">
          Step {step + 1} of {history.length}
        </h2>

        <button
          disabled={step === history.length - 1}
          onClick={() => setStep(step + 1)}
          className="bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 rounded"
        >
          Next
        </button>
      </div>

      <div className="bg-blue-50 border border-gray-300 rounded-lg p-4 mb-6">
        <p className="text-lg">
          Current Reference :
          <strong> {simulation.reference_string[step]}</strong>
        </p>
      </div>

      {/* Frame History */}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Physical Memory</h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border border-gray-300">
              <th className="border p-3 border-gray-400">Frame</th>

              <th className="border p-3 border-gray-400">Page</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length: simulation.frames,
            }).map((_, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border p-3 text-center border-gray-400">
                  Frame {index}
                </td>

                <td className="border p-3 text-center border-gray-400">
                  {currentFrames[index] ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final Memory */}

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Final Physical Memory</h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 border-gray-400">Frame</th>

              <th className="border p-3 border-gray-400">Final Page</th>
            </tr>
          </thead>

          <tbody>
            {simulation.final_frames.map((page, index) => (
              <tr key={index}>
                <td className="border p-3 text-center border-gray-400">
                  Frame {index}
                </td>

                <td className="border p-3 text-center border-gray-400">
                  {page}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicalMemory;
