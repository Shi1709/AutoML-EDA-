/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Correlation = ({ pipelineId, goToStep }) => {
  const [threshold, setThreshold] = useState(0.9);
  const [matrix, setMatrix] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(
      `http://127.0.0.1:8000/pipeline/correlation?pipeline_id=${pipelineId}&threshold=${threshold}`,
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
  const rows = headers.map((r) => [r, headers.map((c) => matrix[r][c])]);

  const toggleColumn = (col) => {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  const handleDropAndContinue = async () => {
    if (selectedCols.length === 0) {
      goToStep(4);
      return;
    }

    await fetch(
      `http://127.0.0.1:8000/pipeline/drop-columns?pipeline_id=${pipelineId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columns: selectedCols }),
      },
    );

    goToStep(4); // Encoding
  };

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

        {/* MATRIX — unchanged */}
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
                    <th key={h} className="px-2 text-gray-500 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([r, vals]) => (
                  <tr key={r}>
                    <td className="pr-2 text-gray-600">{r}</td>
                    {vals.map((v, i) => (
                      <td
                        key={i}
                        className={`px-3 py-2 rounded-md text-center font-medium ${
                          v > 0.8
                            ? "bg-blue-500 text-white"
                            : v < -0.8
                              ? "bg-red-400 text-white"
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
          </div>
        </div>

        {/* Threshold — unchanged */}
        <div className="rounded-lg border bg-white px-5 py-4">
          <div className="flex justify-between mb-3">
            <p className="text-sm font-semibold">Correlation Threshold</p>
            <span className="text-sm text-blue-600">
              {threshold.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(+e.target.value)}
            className="w-full accent-blue-600"
          />
        </div>

        {/* PAIRS — wired */}
        <div className="rounded-lg border bg-white overflow-hidden">
          <div className="px-5 py-4 border-b flex justify-between">
            <p className="text-sm font-semibold">Highly Correlated Pairs</p>
            <span className="text-sm text-gray-500">
              {pairs.length} pairs found
            </span>
          </div>

          <div className="divide-y">
            {pairs.map((p, i) => (
              <label
                key={i}
                className="flex items-center justify-between px-5 py-4 text-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-blue-600"
                    onChange={() => toggleColumn(p.col2)}
                  />
                  <span>
                    {p.col1} ↔ {p.col2}
                  </span>
                </div>
                <span className="rounded px-2 py-1 text-sm bg-gray-100">
                  {p.value}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDropAndContinue}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Continue to Encoding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Correlation;
