import { Layers, TrendingDown } from "lucide-react";
import { useState } from "react";

const PCA = () => {
  const [enabled, setEnabled] = useState(false);
  const [variance, setVariance] = useState(95);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">PCA</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">
            PCA (Principal Component Analysis)
          </h3>
          <p className="text-sm text-gray-500">
            Reduce dimensionality while preserving important variance in your
            data
          </p>
        </div>
        <div className="flex items-center justify-between border border-gray-300 bg-white rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers />
            </div>
            <div>
              <p className="font-medium">Enable PCA</p>
              <p className="text-sm text-gray-500">
                Reduce feature dimensions before final model training
              </p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
          </label>
        </div>
        {!enabled && (
          <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
            PCA is disabled. The model will use all 9 features.
          </div>
        )}
        {enabled && (
          <>
            <div className="border border-gray-300 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Variance to Retain</p>
                <p className="font-semibold text-blue-600">{variance}%</p>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={variance}
                onChange={(e) => setVariance(e.target.value)}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>70% (More compression)</span>
                <span>99% (Less compression)</span>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <p className="font-medium mb-4">Dimension Reduction Preview</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center bg-gray-50 rounded-lg py-6">
                  <p className="text-sm text-gray-500">
                    Original Dimensions
                  </p>
                  <p className="text-3xl font-semibold">9</p>
                </div>
                <span className="mx-4 text-blue-600 text-2xl"><TrendingDown /></span>
                <div className="flex-1 text-center bg-blue-50 rounded-lg py-6">
                  <p className="text-sm text-gray-500">
                    Estimated Components
                  </p>
                  <p className="text-3xl font-semibold text-blue-600">
                    ~6
                  </p>
                </div>
              </div>
              <p className="text-xs text-center text-gray-500 mt-3">
                Approximate 33% reduction in dimensionality
              </p>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="font-medium mb-2">Benefits of PCA</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Reduces training time and model complexity</li>
                <li>Helps prevent overfitting</li>
                <li>Removes multicollinearity between features</li>
                <li>May improve model generalization</li>
              </ul>
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            Continue to Best Model Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PCA;
