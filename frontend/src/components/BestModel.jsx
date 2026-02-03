import { useState } from "react";

const models = [
  {
    rank: 1,
    name: "Gradient Boosting Regressor",
    time: "2.6s",
    r2: "0.887",
    mse: "0.0529",
    mae: "0.1592",
    recommended: true,
  },
  {
    rank: 2,
    name: "Neural Network Regressor",
    time: "3.6s",
    r2: "0.843",
    mse: "0.0371",
    mae: "0.0430",
  },
  {
    rank: 3,
    name: "Support Vector Regressor",
    time: "4.9s",
    r2: "0.832",
    mse: "0.0975",
    mae: "0.2272",
  },
  {
    rank: 4,
    name: "Ridge Regression",
    time: "2.9s",
    r2: "0.781",
    mse: "0.1811",
    mae: "0.1082",
  },
  {
    rank: 5,
    name: "Random Forest Regressor",
    time: "4.3s",
    r2: "0.726",
    mse: "0.2262",
    mae: "0.1042",
  },
  {
    rank: 6,
    name: "Linear Regression",
    time: "3.6s",
    r2: "0.706",
    mse: "0.0499",
    mae: "0.2958",
  },
];

const BestModel = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-md font-semibold">Best Model</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Select Best Model</h3>
          <p className="text-sm text-gray-500">
            Choose the model to use for final predictions
          </p>
        </div>
        <div className="space-y-4">
          {models.map((model) => {
            const isSelected = selectedRank === model.rank;

            return (
              <div
                key={model.rank}
                onClick={() => setSelectedRank(model.rank)}
                className={`cursor-pointer rounded-xl border p-5 transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isSelected ? "✓" : `#${model.rank}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{model.name}</p>
                        {model.recommended && (
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                            ☆ Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Training time: {model.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">
                      {model.r2}
                    </p>
                    <p className="text-xs text-gray-500">R² Score</p>
                  </div>
                </div>
                <div className="my-4 border-t" />
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>MSE: {model.mse}</span>
                  <span>MAE: {model.mae}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pt-4">
          <button
            disabled={!selectedRank}
            className={`cursor-pointer px-6 py-2 rounded-lg text-white ${
              selectedRank
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
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
