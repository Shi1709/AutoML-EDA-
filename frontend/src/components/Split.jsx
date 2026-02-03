import { useState } from "react";
import { SquareSplitVertical } from "lucide-react";

const TOTAL_SAMPLES = 1460;

const Split = () => {
  const [trainPercent, setTrainPercent] = useState(80);

  const trainCount = Math.round((trainPercent / 100) * TOTAL_SAMPLES);
  const testCount = TOTAL_SAMPLES - trainCount;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Split</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Train/Test Split</h3>
          <p className="text-sm text-gray-500">
            Split the dataset into training and testing sets for model evaluation
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
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
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
          <p className="text-sm font-semibold text-gray-900">
            Dataset Distribution
          </p>
          <div className="flex h-10 w-full overflow-hidden rounded-md bg-gray-100 text-sm font-medium">
            <div
              className="flex items-center justify-center bg-blue-600 text-white transition-all"
              style={{ width: `${trainPercent}%` }}
            >
              Training
            </div>
            <div
              className="flex items-center justify-center bg-gray-100 text-gray-700 transition-all"
              style={{ width: `${100 - trainPercent}%` }}
            >
              Testing
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-blue-50 px-4 py-4">
              <p className="text-sm text-gray-600">Training Samples</p>
              <p className="text-xl font-semibold text-blue-600">
                {trainCount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 px-4 py-4">
              <p className="text-sm text-gray-600">Testing Samples</p>
              <p className="text-xl font-semibold text-gray-900">
                {testCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Recommendations
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>80/20 split is commonly used for most datasets</li>
            <li>Use larger training sets for small datasets</li>
            <li>Consider cross-validation for more robust evaluation</li>
          </ul>
        </div>
        <div className="flex justify-end">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Continue to Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default Split;
