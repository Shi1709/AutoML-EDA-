const Encoding = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Encoding</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Feature Encoding</h3>
          <p className="text-sm text-gray-500">
            Transform categorical features into numerical format for model training
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Categorical Columns Detected
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
              Street <span className="text-gray-500">(2 unique)</span>
            </span>
            <span className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
              Neighborhood <span className="text-gray-500">(25 unique)</span>
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-5">
          <p className="text-sm font-semibold text-gray-900">
            Select Encoding Strategy
          </p>
          <label className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4 cursor-pointer">
            <input
              type="radio"
              name="encoding"
              defaultChecked
              className="mt-1 h-4 w-4 accent-blue-600"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Label Encoding
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Convert each category to a unique integer. Best for ordinal data
                or tree-based models.
              </p>
              <div className="rounded bg-gray-100 px-3 py-2 text-sm font-mono text-gray-700">
                Example: [&quot;Pave&quot;, &quot;Grvl&quot;] → [0, 1]
              </div>
            </div>
          </label>
          <label className="flex items-start gap-3 rounded-lg border border-gray-200 px-4 py-4 cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="encoding"
              className="mt-1 h-4 w-4 accent-blue-600"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                One-Hot Encoding
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Create binary columns for each category. Best for nominal data
                and linear models.
              </p>
              <div className="rounded bg-gray-100 px-3 py-2 text-sm font-mono text-gray-700">
                Example: [&quot;Pave&quot;, &quot;Grvl&quot;] → [[1,0], [0,1]]
              </div>
            </div>
          </label>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Encoding Preview
          </p>
          <p className="text-sm text-gray-600">
            2 column(s) will be transformed with integer labels. Total unique
            categories: 27
          </p>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Continue to Target Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Encoding;
