/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const MetricCard = ({ title, value, color = "blue" }) => (
  <div className="border border-gray-300 rounded-xl p-5">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-3xl font-semibold text-${color}-600`}>
      {value ?? "—"}
    </p>
  </div>
);

const Evaluation = ({ pipelineId, goToStep }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pipelineId) return;

    setLoading(true);

    fetch(`http://127.0.0.1:8000/pipeline/evaluate?pipeline_id=${pipelineId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pipelineId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Evaluating model...
      </div>
    );
  }

  if (!data) return null;

  const { model, task_type, metrics } = data;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Evaluation</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Model Evaluation</h3>
          <p className="text-sm text-gray-500">
            Detailed performance metrics for <b>{model}</b>
          </p>
        </div>

        {/* REGRESSION */}
        {task_type === "REGRESSION" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="R² Score" value={metrics.r2} />
            <MetricCard title="MSE" value={metrics.mse} color="green" />
            <MetricCard title="MAE" value={metrics.mae} />
          </div>
        )}

        {/* CLASSIFICATION */}
        {task_type === "CLASSIFICATION" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard title="Accuracy" value={metrics.accuracy} />
            <MetricCard title="Precision" value={metrics.precision} />
            <MetricCard title="Recall" value={metrics.recall} />
            <MetricCard title="F1 Score" value={metrics.f1} />
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={() => goToStep(12)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue to Visualization
          </button>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
