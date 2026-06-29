const MemoryVisualization = ({ frameHistory }) => {
  if (!frameHistory || frameHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Memory Visualization
      </h2>

      <div className="space-y-3">
        {frameHistory.map((frames, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            <span className="w-20 text-sm font-medium text-slate-700">
              Step {index + 1}
            </span>

            <div className="flex gap-2">
              {frames.map((page, frameIndex) => (
                <div
                  key={frameIndex}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-white font-medium text-slate-900"
                >
                  {page}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryVisualization;
