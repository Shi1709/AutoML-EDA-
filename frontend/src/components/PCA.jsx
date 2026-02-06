/* eslint-disable react/prop-types */
import { Layers, TrendingDown } from "lucide-react";
import { useState } from "react";

const PCA = ({ pipelineId, goToStep }) => {
  const [enabled, setEnabled] = useState(false);
  const [variance, setVariance] = useState(95);
  const [loading, setLoading] = useState(false);
  const [pcaMeta, setPcaMeta] = useState(null);

  const applyPCA = async () => {
    if (!pipelineId) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/pipeline/pca?pipeline_id=${pipelineId}&enabled=${enabled}&variance=${variance}`,
        { method: "POST" },
      );

      const data = await res.json();
      setPcaMeta(data.meta);

      // goToStep(10);
    } catch (err) {
      console.error(err);
      alert("PCA failed");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
          </label>
        </div>

        {!enabled && (
          <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
            PCA is disabled. The model will use all features.
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
                onChange={(e) => setVariance(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="border border-gray-300 rounded-lg p-4">
              <p className="font-medium mb-4">Dimension Reduction Preview</p>

              <div className="flex items-center justify-between">
                <div className="flex-1 text-center bg-gray-50 rounded-lg py-6">
                  <p className="text-sm text-gray-500">Original Dimensions</p>
                  <p className="text-3xl font-semibold">
                    {pcaMeta?.original_dims ?? "—"}
                  </p>
                </div>

                <span className="mx-4 text-blue-600 text-2xl">
                  <TrendingDown />
                </span>

                <div className="flex-1 text-center bg-blue-50 rounded-lg py-6">
                  <p className="text-sm text-gray-500">Estimated Components</p>
                  <p className="text-3xl font-semibold text-blue-600">
                    {pcaMeta?.components ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <button
            onClick={applyPCA}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Apply PCA
          </button>

          {pcaMeta && (
            <button
              onClick={() => goToStep(10)}
              className="ml-3 bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Continue to Best Model Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCA;
