import { useState } from "react";
import api from "../services/api";

const AddressTranslation = () => {
  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";
  const [logicalAddress, setLogicalAddress] = useState("");
  const [pageSize, setPageSize] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleTranslate = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await api.post("/translate", {
        logical_address: Number(logicalAddress),
        page_size: Number(pageSize),
      });

      setResult(response.data);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.detail || "Translation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Address Translation</h1>

      <form
        onSubmit={handleTranslate}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="mb-4">
          <label className="block mb-2 text-slate-700">Logical Address</label>

          <input
            type="number"
            value={logicalAddress}
            onChange={(e) => setLogicalAddress(e.target.value)}
            className={fieldClass}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2  text-slate-700">Page Size</label>

          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className={fieldClass}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50  rounded"
        >
          Translate
        </button>
      </form>

      {error && <div className="mt-4 p-4 bg-red-100 rounded">{error}</div>}

      {result && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Translation Result</h2>

          <div className="space-y-2">
            <p>
              <strong>Page Number:</strong> {result.page_number}
            </p>

            <p>
              <strong>Offset:</strong> {result.offset}
            </p>

            <p>
              <strong>Frame Number:</strong> {result.frame_number}
            </p>

            <p>
              <strong>Physical Address:</strong> {result.physical_address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressTranslation;
