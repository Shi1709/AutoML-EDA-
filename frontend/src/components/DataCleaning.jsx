import { useState } from "react";

/* eslint-disable react/prop-types */
const DataCleaning = ({ pipelineId, goToStep }) => {
  const [strategy, setStrategy] = useState("drop");
  const [result, setResult] = useState(null);

  const handleClean = async () => {
    if (!pipelineId) {
      alert("Pipeline not found");
      return;
    }
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/pipeline/clean?pipeline_id=${pipelineId}&strategy=${strategy}`,
        { method: "POST" },
      );

      const data = await res.json();
      setResult(data);

      goToStep(3); 
    } catch (err) {
      console.error(err);
      alert("Cleaning failed");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Cleaning</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Data Cleaning</h3>
          <p className="text-sm text-gray-500">
            Handle missing values and remove unnecessary columns
          </p>
        </div>

        <div className="rounded-lg border bg-white px-5 py-4">
          <label className="flex gap-3">
            <input
              type="radio"
              checked={strategy === "drop"}
              onChange={() => setStrategy("drop")}
            />
            Drop rows with missing values
          </label>

          <label className="flex gap-3 mt-2">
            <input
              type="radio"
              checked={strategy === "fill"}
              onChange={() => setStrategy("fill")}
            />
            Fill missing values (median / mode)
          </label>
        </div>
        {result && (
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3">
            <p className="text-sm font-medium text-green-800">
              Cleaning completed successfully
            </p>
            <p className="text-sm text-green-700">{result.meta.action}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleClean}
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Continue to Correlation Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCleaning;
