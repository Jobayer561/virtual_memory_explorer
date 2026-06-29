import { useEffect, useState } from "react";
import api from "../services/api";
import PageTable from "../components/PageTable";
import toast from "react-hot-toast";
const PageTablePage = () => {
  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";
  const [entries, setEntries] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [pageNumber, setPageNumber] = useState("");

  const [frameNumber, setFrameNumber] = useState("");

  const fetchPageTable = async () => {
    const response = await api.get("/page-table");

    return response.data;
  };

  useEffect(() => {
    const loadPageTable = async () => {
      try {
        const data = await fetchPageTable();

        setEntries(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPageTable();
  }, []);

  const handleAddEntry = async () => {
    try {
      if (Number(frameNumber) === 0 || Number(pageNumber) === 0) {
        toast.error("Frame number or Page Number cannot be 0.");

        return;
      }

      await api.post(
        `/page-table?page_number=${pageNumber}&frame_number=${frameNumber}`,
      );

      setShowModal(false);

      setPageNumber("");

      setFrameNumber("");

      const data = await fetchPageTable();

      setEntries(data);
      toast.success("Page table entry added successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail || "Failed to add page table entry.",
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Page Table Manager</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 rounded"
        >
          + Add Entry
        </button>
      </div>

      <PageTable entries={entries} />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Page Table Entry</h2>

            <div className="mb-4">
              <label className="block mb-2">Page Number</label>

              <input
                type="number"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2">Frame Number</label>

              <input
                type="number"
                value={frameNumber}
                onChange={(e) => setFrameNumber(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddEntry}
                className=" bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 rounded"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTablePage;
