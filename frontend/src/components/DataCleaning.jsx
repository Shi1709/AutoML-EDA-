import { TriangleAlert } from "lucide-react";

const DataCleaning = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Cleaning</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Data Cleaning</h3>
          <p className="text-sm text-gray-500">
            Handle missing values and remove unnecessary columns
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-100">
            <TriangleAlert className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-md font-semibold text-gray-900">
              304 missing values found
            </p>
            <p className="text-sm text-gray-500">
              2 columns contain null values
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-300 text-sm font-semibold text-gray-900">
            Columns with Missing Values
          </div>
          <div className="px-5 py-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">LotFrontage</p>
                <p className="text-sm text-gray-500">259 nulls (17.7%)</p>
              </div>
              <div className="w-40 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-orange-400 w-[18%]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Neighborhood
                </p>
                <p className="text-sm text-gray-500">45 nulls (3.1%)</p>
              </div>
              <div className="w-40 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-orange-400 w-[3%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
          <p className="text-sm font-semibold text-gray-900">
            How to handle missing values?
          </p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-gray-800">
              <input type="radio" name="missing" defaultChecked />
              Drop rows with missing values
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-800">
              <input type="radio" name="missing" />
              Fill with mean (numeric columns)
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-800">
              <input type="radio" name="missing" />
              Fill with median (numeric columns)
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-800">
              <input type="radio" name="missing" />
              Fill with mode (most frequent value)
            </label>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-4">
            Select columns to remove
          </p>
          <div className="grid grid-cols-3 gap-y-4 text-sm text-gray-800">
            {[
              "Id",
              "MSSubClass",
              "LotFrontage",
              "LotArea",
              "Street",
              "Neighborhood",
              "OverallQual",
              "YearBuilt",
              "SalePrice",
            ].map((col) => (
              <label key={col} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                {col}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
        <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Continue to Correlation Analysis
        </button>
      </div>
      </div>
    </div>
  );
};

export default DataCleaning;
