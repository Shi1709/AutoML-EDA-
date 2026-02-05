/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Correlation = ({ pipelineId, goToStep }) => {
  const [threshold, setThreshold] = useState(0.9);
  const [matrix, setMatrix] = useState(null);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(
      `http://127.0.0.1:8000/pipeline/correlation?pipeline_id=${pipelineId}&threshold=${threshold}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMatrix(data.matrix);
        setPairs(data.pairs);
      })
      .catch(console.error);
  }, [pipelineId, threshold]);

  if (!matrix) return null;

  const headers = Object.keys(matrix);
  const rows = headers.map((row) => [
    row,
    headers.map((col) => matrix[row][col]),
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Correlation</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Correlation Analysis</h3>
          <p className="text-sm text-gray-500">
            Identify and remove highly correlated features to reduce
            multicollinearity
          </p>
        </div>

        {/* Correlation Matrix */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b text-sm font-semibold text-gray-900">
            Correlation Matrix (Preview)
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="border-separate border-spacing-2 text-sm">
              <thead>
                <tr>
                  <th />
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="max-w-22.5 truncate px-2 text-gray-500 font-medium"
                      title={h}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map(([rowLabel, values]) => (
                  <tr key={rowLabel}>
                    <td
                      className="max-w-30 truncate pr-2 text-gray-600"
                      title={rowLabel}
                    >
                      {rowLabel}
                    </td>

                    {values.map((v, i) => (
                      <td
                        key={i}
                        className={`px-3 py-2 rounded-md text-center font-medium ${
                          v > 0.8
                            ? "bg-blue-500 text-white"
                            : v > 0.3
                            ? "bg-blue-100 text-blue-700"
                            : v < -0.8
                            ? "bg-red-400 text-white"
                            : v < -0.3
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {v.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-blue-500" /> High positive
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-blue-100" /> Low positive
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-red-400" /> High negative
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-red-100" /> Low negative
              </span>
            </div>
          </div>
        </div>

        {/* Threshold */}
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">
              Correlation Threshold
            </p>
            <span className="text-sm font-medium text-blue-600">
              {threshold.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min="0.5"
            max="1"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-blue-600"
          />

          <p className="text-sm text-gray-500 mt-2">
            Features with correlation above this threshold will be flagged
          </p>
        </div>

        {/* Highly Correlated Pairs */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              Highly Correlated Pairs
            </p>
            <span className="text-sm text-gray-500">
              {pairs.length} pairs found
            </span>
          </div>

          <div className="divide-y">
            {pairs.map((p, idx) => (
              <label
                key={idx}
                className="flex items-center justify-between px-5 py-4 text-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="truncate max-w-60">
                    {p.col1} ↔ {p.col2}
                  </span>
                </div>

                <span
                  className={`rounded px-2 py-1 font-medium ${
                    p.value > 0
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.value}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => goToStep(4)}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Continue to Encoding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Correlation;
