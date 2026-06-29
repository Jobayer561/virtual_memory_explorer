const SimulationSummary = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Simulation Summary
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <h3 className="text-sm text-slate-500">Page Faults</h3>

          <p className="text-2xl font-semibold text-slate-900">
            {result.page_faults}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <h3 className="text-sm text-slate-500">Hits</h3>

          <p className="text-2xl font-semibold text-slate-900">{result.hits}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <h3 className="text-sm text-slate-500">Hit Ratio</h3>

          <p className="text-2xl font-semibold text-slate-900">
            {result.hit_ratio}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;
