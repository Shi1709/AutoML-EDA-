const Evaluation = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Evaluation</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Model Evaluation</h3>
          <p className="text-sm text-gray-500">
            Detailed performance metrics for Gradient Boosting Regressor
          </p>
        </div>
        <div className="border border-gray-300 rounded-xl p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            ✓
          </div>
          <div>
            <p className="font-semibold">Gradient Boosting Regressor</p>
            <p className="text-sm text-gray-500">
              Regression Model · Trained in 2.6s
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded-xl p-5 space-y-3">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              ↗ R² Score
            </p>
            <p className="text-3xl font-semibold text-blue-600">0.887</p>
            <p className="text-sm text-gray-500">
              Proportion of variance explained
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[89%] bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="border border-gray-300 rounded-xl p-5 space-y-3">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              ◎ MSE
            </p>
            <p className="text-3xl font-semibold text-green-500">0.0529</p>
            <p className="text-sm text-gray-500">
              Mean Squared Error
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-green-500 rounded-full" />
            </div>
          </div>
          <div className="border border-gray-300 rounded-xl p-5 space-y-3">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              ⚖ MAE
            </p>
            <p className="text-3xl font-semibold text-blue-600">0.1592</p>
            <p className="text-sm text-gray-500">
              Mean Absolute Error
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl p-5">
          <p className="font-semibold mb-1">Performance Summary</p>
          <p className="text-sm text-gray-600">
            Excellent fit. The model explains a high proportion of variance in
            the target variable.
          </p>
        </div>
        <div className="flex justify-end pt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            Continue to Visualization
          </button>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
