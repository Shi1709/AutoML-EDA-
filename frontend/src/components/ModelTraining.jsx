import { useState } from "react";
import { Play, CheckCircle, Loader2 } from "lucide-react";

/* eslint-disable react/prop-types */

const ModelTraining = ({ pipelineId, goToStep }) => {
  const [stage, setStage] = useState("ready");
  const [progress, setProgress] = useState(0);
  const [scores, setScores] = useState({});
  const [modelList, setModelList] = useState([]);

  const startTraining = async () => {
    setStage("training");

    const res = await fetch(
      `http://127.0.0.1:8000/pipeline/train?pipeline_id=${pipelineId}`,
      { method: "POST" },
    );
    const data = await res.json();

    const models = Object.keys(data.meta.metrics);

    setScores(data.meta.metrics);
    setModelList(models);
    setProgress(0);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProgress(i);

      if (i >= models.length) {
        clearInterval(interval);
        setStage("completed"); 
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Training</h2>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Model Training</h3>
          <p className="text-sm text-gray-500">
            Train multiple machine learning models and compare their performance
          </p>
        </div>
        {stage === "ready" && (
          <div className="rounded-lg border bg-white px-6 py-10 text-center space-y-4">
            <Play className="mx-auto h-10 w-10 text-blue-600" />
            <p className="text-lg font-semibold">Ready to Train Models</p>

            <button
              onClick={startTraining}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm text-white"
            >
              <Play className="h-4 w-4" />
              Start Training
            </button>
          </div>
        )}
        {stage !== "ready" && (
          <div className="rounded-lg border bg-white overflow-hidden">
            <div className="px-5 py-4 border-b flex justify-between">
              <p className="text-sm font-semibold">Training Progress</p>

              {stage === "training" ? (
                <div className="flex gap-2 text-blue-600 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Training...
                </div>
              ) : (
                <div className="flex gap-2 text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </div>
              )}
            </div>
            <div className="divide-y">
              {modelList.map((model, index) => {
                const done = index < progress;

                return (
                  <div key={model} className="px-5 py-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{model}</p>

                      {done && scores[model] !== undefined && (
                        <span className="text-sm text-green-600">
                          Avg Score: {scores[model].avg_score}· Time:{" "}
                          {scores[model].avg_time_sec}s · Mem:{" "}
                          {scores[model].avg_memory_mb}MB
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: done ? "100%" : "60%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stage === "completed" && (
          <div className="flex justify-end">
            <button
              onClick={() => goToStep(8)}
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Continue to Comparison
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTraining;
