const ResultCard = ({ result }) => {
  if (!result) return null;

  const missRatio = (100 - result.hit_ratio).toFixed(2);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Simulation Result
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <p className="rounded-lg bg-slate-50 p-3">
          <strong>Page Faults:</strong> {result.page_faults}
        </p>

        <p className="rounded-lg bg-slate-50 p-3">
          <strong>Hits:</strong> {result.hits}
        </p>

        <p className="rounded-lg bg-slate-50 p-3">
          <strong>Misses:</strong> {result.page_faults}
        </p>

        <p className="rounded-lg bg-slate-50 p-3">
          <strong>Hit Ratio:</strong> {result.hit_ratio}%
        </p>

        <p className="rounded-lg bg-slate-50 p-3">
          <strong>Miss Ratio:</strong> {missRatio}%
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
