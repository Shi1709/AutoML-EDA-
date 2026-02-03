import { useState } from "react";
import { ChevronDown, Check, TrendingUp } from "lucide-react";

const columns = [
  { name: "Id", type: "int64" },
  { name: "MSSubClass", type: "int64" },
  { name: "LotFrontage", type: "float64" },
  { name: "LotArea", type: "int64" },
  { name: "Street", type: "object" },
  { name: "Neighborhood", type: "object" },
  { name: "OverallQual", type: "int64" },
  { name: "YearBuilt", type: "int64" },
  { name: "SalePrice", type: "int64" },
];

const TargetSelection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(columns[2]); // LotFrontage

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Target</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Target Selection</h3>
          <p className="text-sm text-gray-500">
            Choose the column you want to predict. The task type will be
            automatically detected.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <input
              type="radio"
              defaultChecked
              className="h-4 w-4 accent-blue-600"
            />
            Select Target Column
          </div>
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="cursor-pointer w-full flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-left text-sm bg-white"
            >
              <span>
                {selected.name}{" "}
                <span className="text-gray-500">({selected.type})</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                {columns.map((col) => (
                  <div
                    key={col.name}
                    onClick={() => {
                      setSelected(col);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer ${
                      col.name === selected.name
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>
                      {col.name}{" "}
                      <span className="text-gray-500">({col.type})</span>
                    </span>
                    {col.name === selected.name && (
                      <Check className="h-4 w-4 text-gray-900" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Detected: Regression Task
            </p>
            <p className="text-sm text-gray-600">
              The target column contains continuous values. Models will predict
              numerical outcomes.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-4">
            Target Column Details
          </p>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="text-gray-500">Data Type</p>
              <p className="font-medium text-gray-900">{selected.type}</p>
            </div>
            <div>
              <p className="text-gray-500">Unique Values</p>
              <p className="font-medium text-gray-900">110</p>
            </div>
            <div>
              <p className="text-gray-500">Missing Values</p>
              <p className="font-medium text-orange-500">259</p>
            </div>
            <div>
              <p className="text-gray-500">Sample Values</p>
              <p className="font-medium text-gray-900">
                65.0, 80.0, 68.0
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Continue to Train/Test Split
          </button>
        </div>
      </div>
    </div>
  );
};

export default TargetSelection;
