/* eslint-disable react/prop-types */
import { FileText, X } from "lucide-react";

const UploadPreviewState = ({ data, onRemove, goToStep }) => {
  const previewCols = Object.keys(data.preview[0] || {}).slice(0, 6);

  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Upload Dataset</h3>
        <p className="text-sm text-gray-500">
          {data.meta.rows} rows × {data.meta.columns} columns
        </p>
      </div>

      <div className="border rounded-lg px-4 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{data.meta.file_name}</p>
          </div>
        </div>
        <button onClick={onRemove}>
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="px-4 py-3 border-b font-medium text-sm">
          Data Preview
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              {previewCols.map((c) => (
                <th key={c} className="px-4 py-3 text-left">
                  {c}
                </th>
              ))}
              <th className="px-4 py-3 text-right">…</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.preview.map((row, i) => (
              <tr key={i}>
                {previewCols.map((c) => (
                  <td key={c} className="px-4 py-3">
                    {row[c] ?? (
                      <span className="italic text-gray-400">null</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right text-gray-400">…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => goToStep(2)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
        >
          Continue to Data Cleaning
        </button>
      </div>
    </div>
  );
};

export default UploadPreviewState;
