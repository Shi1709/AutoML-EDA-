import { useState, useEffect } from "react";
import {
  Play,
  CheckCircle,
  Loader2,
  Clock,
} from "lucide-react";

const models = [
  "Linear Regression",
  "Ridge Regression",
  "Random Forest Regressor",
  "Gradient Boosting Regressor",
  "Support Vector Regressor",
  "Neural Network Regressor",
];

const finalScores = {
  "Linear Regression": 0.913,
  "Ridge Regression": 0.795,
  "Random Forest Regressor": 0.735,
  "Gradient Boosting Regressor": 0.895,
  "Support Vector Regressor": 0.627,
  "Neural Network Regressor": 0.739,
};

const ModelTraining = () => {
  const [stage, setStage] = useState("ready");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === "training") {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= models.length) {
            clearInterval(interval);
            setStage("completed");
            return p;
          }
          return p + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [stage]);

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
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center space-y-4">
            <Play className="mx-auto h-10 w-10 text-blue-600" />
            <p className="text-lg font-semibold text-gray-900">
              Ready to Train Models
            </p>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Click the button below to start training multiple regression
              models. This may take a few minutes depending on your dataset
              size.
            </p>
            <button
              onClick={() => setStage("training")}
              className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Play className="h-4 w-4" />
              Start Training
            </button>
          </div>
        )}
        {stage !== "ready" && (
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <p className="text-sm font-semibold text-gray-900">
                Training Progress
              </p>
              {stage === "training" ? (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Training in progress...
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  All models trained
                </div>
              )}
            </div>
            <div className="divide-y">
              {models.map((model, index) => {
                const done = index < progress;
                const active = index === progress && stage === "training";

                return (
                  <div key={model} className="px-5 py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {done ? (
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ) : active ? (
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {done
                              ? "Completed"
                              : active
                              ? "Training..."
                              : "Waiting..."}
                          </p>
                        </div>
                      </div>
                      {done && (
                        <span className="text-sm font-medium text-green-600">
                          R²: {finalScores[model].toFixed(3)}
                        </span>
                      )}
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{
                          width: done
                            ? "100%"
                            : active
                            ? "70%"
                            : "0%",
                        }}
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
            <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Continue to Comparison
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTraining;
