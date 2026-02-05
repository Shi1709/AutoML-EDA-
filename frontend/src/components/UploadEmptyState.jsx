/* eslint-disable react/prop-types */
import { Upload } from "lucide-react";

const UploadEmptyState = ({ onUpload }) => {
  return (
    <div className="flex-1 p-6">
      <h3 className="text-xl font-semibold mb-1">Upload Dataset</h3>
      <p className="text-sm text-gray-500">
        Import your dataset to begin the ML pipeline
      </p>

      <div className="relative mt-6 flex flex-col items-center justify-center
        border-2 border-dashed border-gray-300 rounded-lg h-64 cursor-pointer"
      >
        <Upload className="h-10 w-10 text-gray-400" />
        <p className="text-sm font-medium">Drag & drop your CSV here</p>
        <p className="text-sm text-gray-400">or click to browse</p>

        <input
          type="file"
          accept=".csv,.xlsx,.json,.xml"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onUpload(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default UploadEmptyState;
