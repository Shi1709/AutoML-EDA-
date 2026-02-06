import { useEffect, useState } from "react";
import { ChevronDown, Check, TrendingUp } from "lucide-react";

/* eslint-disable react/prop-types */
const TargetSelection = ({ pipelineId, goToStep }) => {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(`http://127.0.0.1:8000/pipeline/columns?pipeline_id=${pipelineId}`)
      .then((res) => res.json())
      .then((data) => setColumns(data.columns))
      .catch(console.error);
  }, [pipelineId]);

  const handleConfirmTarget = async () => {
    if (!pipelineId || !selected) {
      alert("Pipeline or target missing");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/pipeline/target?pipeline_id=${pipelineId}&target_column=${selected.name}`,
        { method: "POST" },
      );

      const data = await res.json();
      setMeta(data.meta);

      goToStep(6); // Train/Test Split
    } catch (err) {
      console.error(err);
      alert("Target selection failed");
    }
  };

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
                {selected
                  ? `${selected.name} (${selected.type})`
                  : "Select a column"}
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
                      selected?.name === col.name
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>
                      {col.name}{" "}
                      <span className="text-gray-500">({col.type})</span>
                    </span>
                    {selected?.name === col.name && (
                      <Check className="h-4 w-4 text-gray-900" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {meta && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Detected: {meta.task_type} task
              </p>
              <p className="text-sm text-gray-600">
                Target has {meta.unique_values} unique values
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleConfirmTarget}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Continue to Train/Test Split
          </button>
        </div>
      </div>
    </div>
  );
};

export default TargetSelection;
