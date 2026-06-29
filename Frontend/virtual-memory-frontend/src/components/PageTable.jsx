const PageTable = ({ entries }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Page Number
            </th>

            <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Frame Number
            </th>
          </tr>
        </thead>

        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td
                colSpan="2"
                className="px-4 py-6 text-center text-sm text-slate-500"
              >
                No Page Table Entries
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr
                key={entry.page_number}
                className="odd:bg-white even:bg-slate-50"
              >
                <td className="border-b border-slate-200 px-4 py-3">
                  {entry.page_number}
                </td>

                <td className="border-b border-slate-200 px-4 py-3">
                  {entry.frame_number}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PageTable;
