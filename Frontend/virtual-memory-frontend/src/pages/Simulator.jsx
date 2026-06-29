import { useState } from "react";
import toast from "react-hot-toast";
import SimulationForm from "../components/SimulationForm";
import ResultCard from "../components/ResultCard";
import api from "../services/api";
import MemoryVisualization from "../components/MemoryVisualization";
import SimulationSummary from "../components/SimulationSummary";
const Simulator = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulation = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/simulate", data);

      setResult(response.data);

      toast.success("Simulation completed successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to run simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Virtual Memory Explorer</h1>
      <SimulationForm onSubmit={handleSimulation} loading={loading} />

      <ResultCard result={result} />

      {result && <SimulationSummary result={result} />}

      {result && <MemoryVisualization frameHistory={result.frame_history} />}
    </div>
  );
};

export default Simulator;
