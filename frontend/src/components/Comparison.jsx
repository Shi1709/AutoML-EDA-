/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const Comparison = ({ pipelineId, goToStep }) => {
  const [models, setModels] = useState([]);
  const [bestModel, setBestModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(`http://127.0.0.1:8000/pipeline/compare?pipeline_id=${pipelineId}`)
      .then((res) => res.json())
      .then((data) => {
        setBestModel(data.best_model);   
        setModels(data.ranking);        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pipelineId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Comparing models…
      </div>
    );
  }

  if (!bestModel || models.length === 0) return null;

  const best = models.find((m) => m.model === bestModel);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Comparison</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Model Comparison</h3>
          <p className="text-sm text-gray-500">
            Averaged over 3 runs per model
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Best Performing Model</p>
              <p className="font-semibold">{bestModel}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-blue-600">
              {best?.avg_score?.toFixed(3)}
            </p>
            <p className="text-sm text-gray-500">Avg Score</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-6 py-3">Model</th>
                <th className="px-6 py-3">Avg Score</th>
                <th className="px-6 py-3">Avg Time (s)</th>
                <th className="px-6 py-3">Avg Memory (MB)</th>
                <th className="px-6 py-3">Rank</th>
              </tr>
            </thead>

            <tbody>
              {models.map((m, idx) => (
                <tr
                  key={m.model}
                  className={`border-b ${
                    m.model === bestModel ? "bg-blue-50 font-medium" : ""
                  }`}
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    {m.model === bestModel && (
                      <Trophy className="h-4 w-4 text-blue-600" />
                    )}
                    {m.model}
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {m.avg_score.toFixed(4)}
                  </td>
                  <td className="px-6 py-4">
                    {m.avg_time_sec.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {m.avg_memory_mb.toFixed(1)}
                  </td>
                  <td className="px-6 py-4">#{idx + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => goToStep(9)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Continue to PCA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
