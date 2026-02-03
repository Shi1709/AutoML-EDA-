import { Trophy } from "lucide-react";

const models = [
  {
    name: "Support Vector Regressor",
    r2: 0.927,
    mse: 0.254,
    mae: 0.2982,
    time: 1.1,
    best: true,
  },
  {
    name: "Gradient Boosting Regressor",
    r2: 0.893,
    mse: 0.3167,
    mae: 0.1646,
    time: 2.1,
  },
  {
    name: "Ridge Regression",
    r2: 0.875,
    mse: 0.2345,
    mae: 0.0032,
    time: 4.6,
  },
  {
    name: "Linear Regression",
    r2: 0.746,
    mse: 0.1985,
    mae: 0.056,
    time: 1.0,
  },
  {
    name: "Neural Network Regressor",
    r2: 0.663,
    mse: 0.0716,
    mae: 0.0541,
    time: 2.2,
  },
  {
    name: "Random Forest Regressor",
    r2: 0.626,
    mse: 0.2358,
    mae: 0.2961,
    time: 1.5,
  },
];

const bestModel = models.reduce((best, model) =>
  model.r2 > best.r2 ? model : best,
);

const Comparison = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Comparison</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Model Comparison</h3>
          <p className="text-sm text-gray-500">
            Compare performance metrics across all trained models
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Best Performing Model</p>
              <p className="font-semibold">{bestModel.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-blue-600">
              {bestModel.r2.toFixed(3)}
            </p>
            <p className="text-md text-gray-500">R² Score</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  colSpan={5}
                  className="px-6 py-4 text-sm font-semibold text-gray-700 text-left border-b border-gray-300"
                >
                  Performance Metrics
                </th>
              </tr>
              <tr className="bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-6 py-3 border-b border-gray-300">Model</th>
                <th className="px-6 py-3 border-b border-gray-300">R² Score</th>
                <th className="px-6 py-3 border-b border-gray-300">MSE</th>
                <th className="px-6 py-3 border-b border-gray-300">MAE</th>
                <th className="px-6 py-3 border-b border-gray-300">Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.name}
                  className={
                    model.name === bestModel.name
                      ? "bg-blue-50 font-medium border-b border-gray-300"
                      : "bg-white border-b border-gray-300"
                  }
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    {model.name === bestModel.name && (
                      <Trophy className="h-4 w-4 text-blue-600" />
                    )}
                    {model.name}
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {model.r2.toFixed(3)}
                  </td>
                  <td className="px-6 py-4">{model.mse.toFixed(4)}</td>
                  <td className="px-6 py-4">{model.mae.toFixed(4)}</td>
                  <td className="px-6 py-4">{model.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
