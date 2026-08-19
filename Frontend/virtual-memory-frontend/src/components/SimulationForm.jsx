import { useState } from "react";

const SimulationForm = ({ onSubmit, loading }) => {
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [frames, setFrames] = useState(3);
  const [referenceString, setReferenceString] = useState("");

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

  const handleSubmit = (e) => {
    e.preventDefault();

    const references = referenceString
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((item) => !isNaN(item));

    onSubmit({
      algorithm,
      frames: Number(frames),
      reference_string: references,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Algorithm
        </label>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className={fieldClass}
        >
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
          <option value="OPTIMAL">OPTIMAL</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Frames
        </label>

        <input
          type="number"
          min="1"
          value={frames}
          onChange={(e) => setFrames(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Reference String
        </label>

        <input
          type="text"
          placeholder="Enter string"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Running..." : "Run Simulation"}
      </button>
    </form>
  );
};

export default SimulationForm;
