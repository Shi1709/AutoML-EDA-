/* eslint-disable react/prop-types */
import { useState } from "react";
import { SquareSplitVertical } from "lucide-react";

const Split = ({ pipelineId, goToStep }) => {
  const [trainPercent, setTrainPercent] = useState(80);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSplit = async () => {
    if (!pipelineId) {
      alert("Pipeline not found");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/pipeline/split?pipeline_id=${pipelineId}&train_percent=${trainPercent}`,
        { method: "POST" }
      );

      const data = await res.json();
      setMeta(data.meta);

      goToStep(7); // Model Training
    } catch (err) {
      console.error(err);
      alert("Split failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Split</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Train/Test Split</h3>
          <p className="text-sm text-gray-500">
            Split the dataset into training and testing sets
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SquareSplitVertical className="h-4 w-4 text-blue-600" />
              Training Set Size
            </div>
            <span className="text-xl font-semibold text-blue-600">
              {trainPercent}%
            </span>
          </div>

          <input
            type="range"
            min="60"
            max="90"
            step="1"
            value={trainPercent}
            onChange={(e) => setTrainPercent(Number(e.target.value))}
            className="w-full accent-blue-600"
          />

          <div className="flex justify-between text-sm text-gray-500">
            <span>60%</span>
            <span>90%</span>
          </div>
        </div>

        {/* REAL DATA FROM BACKEND */}
        {meta && (
          <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
            <p className="text-sm font-semibold">Dataset Distribution</p>

            <div className="flex h-10 w-full overflow-hidden rounded-md bg-gray-100 text-sm font-medium">
              <div
                className="flex items-center justify-center bg-blue-600 text-white"
                style={{ width: `${trainPercent}%` }}
              >
                Training
              </div>
              <div
                className="flex items-center justify-center bg-gray-100 text-gray-700"
                style={{ width: `${100 - trainPercent}%` }}
              >
                Testing
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 px-4 py-4">
                <p className="text-sm text-gray-600">Training Samples</p>
                <p className="text-xl font-semibold text-blue-600">
                  {meta.train_size}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 px-4 py-4">
                <p className="text-sm text-gray-600">Testing Samples</p>
                <p className="text-xl font-semibold text-gray-900">
                  {meta.test_size}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSplit}
            disabled={loading}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            Continue to Model Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default Split;
