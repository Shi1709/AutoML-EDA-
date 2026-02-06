/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Trophy, Loader2 } from "lucide-react";

const BestModel = ({ pipelineId, goToStep }) => {
  const [models, setModels] = useState([]);
  const [bestModel, setBestModel] = useState(null); 
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(`http://127.0.0.1:8000/pipeline/compare?pipeline_id=${pipelineId}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data.ranking);      
        setBestModel(data.best_model); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pipelineId]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!bestModel || models.length === 0) return null;

  const best = models.find((m) => m.model === bestModel);

  const confirmBestModel = async () => {
    if (selectedIndex === null) return;

    const modelName = models[selectedIndex].model;
    setSubmitting(true);

    try {
      await fetch(
        `http://127.0.0.1:8000/pipeline/best-model?pipeline_id=${pipelineId}&model_name=${encodeURIComponent(
          modelName
        )}`,
        { method: "POST" }
      );
      goToStep(11);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-md font-semibold">Best Model</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recommended</p>
              <p className="font-semibold">{bestModel}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600">
              {best?.avg_score?.toFixed(3)}
            </p>
            <p className="text-xs text-gray-500">Avg Score</p>
          </div>
        </div>
        <div className="space-y-3">
          {models.map((m, idx) => (
            <div
              key={m.model}
              onClick={() => setSelectedIndex(idx)}
              className={`cursor-pointer rounded-lg border px-5 py-4 ${
                selectedIndex === idx
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{m.model}</p>
                <p className="font-semibold text-blue-600">
                  {m.avg_score.toFixed(4)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            disabled={selectedIndex === null || submitting}
            onClick={confirmBestModel}
            className={`px-6 py-2 rounded-lg text-white ${
              selectedIndex !== null
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300"
            }`}
          >
            Continue to Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestModel;
