/* eslint-disable react/prop-types */
import { FileText, X } from "lucide-react";

const UploadPreviewState = ({ file, onRemove }) => {
  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Upload Dataset</h3>
        <p className="text-sm text-gray-500">
          Import your dataset to begin the ML pipeline
        </p>
      </div>
      <div className="border rounded-lg px-4 py-4 flex items-center justify-between bg-white border-gray-300">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">1,460 rows × 9 columns</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden border-gray-300">
        <div className="px-4 py-3 border-b border-gray-300 font-medium text-sm">
          Column Summary
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Column</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-right font-medium">Nulls</th>
              <th className="px-4 py-3 text-right font-medium">Unique</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Id", "int64", 0, 1460],
              ["MSSubClass", "int64", 0, 15],
              ["LotFrontage", "float64", 259, 110],
              ["LotArea", "int64", 0, 1073],
              ["Street", "object", 0, 2],
              ["Neighborhood", "object", 45, 25],
              ["OverallQual", "int64", 0, 10],
              ["YearBuilt", "int64", 0, 112],
              ["SalePrice", "int64", 0, 663],
            ].map(([col, type, nulls, unique]) => (
              <tr key={col}>
                <td className="px-4 py-3">{col}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {type}
                  </span>
                </td>
                <td
                  className={`px-4 py-3 text-right ${
                    nulls > 0 ? "text-orange-500" : "text-gray-700"
                  }`}
                >
                  {nulls}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {unique}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden border-gray-300">
        <div className="px-4 py-3 border-b border-gray-300 font-medium text-sm">
          Data Preview
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Id</th>
              <th className="px-4 py-3 text-left font-medium">MSSubClass</th>
              <th className="px-4 py-3 text-left font-medium">LotFrontage</th>
              <th className="px-4 py-3 text-left font-medium">LotArea</th>
              <th className="px-4 py-3 text-left font-medium">Street</th>
              <th className="px-4 py-3 text-left font-medium">Neighborhood</th>
              <th className="px-4 py-3 text-right font-medium">…</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              [1, 60, 65, 8450, "Pave", "CollgCr"],
              [2, 20, 80, 9600, "Pave", "Veenker"],
              [3, 60, 68, 11250, "Pave", "CollgCr"],
              [4, 70, "null", 9550, "Grvl", "Crawfor"],
              [5, 60, 84, 14260, "Pave", "NoRidge"],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, idx) => (
                  <td
                    key={idx}
                    className={`px-4 py-3 ${
                      cell === "null"
                        ? "italic text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-3 text-right text-gray-400">…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Continue to Data Cleaning
        </button>
      </div>
    </div>
  );
};

export default UploadPreviewState;
``
