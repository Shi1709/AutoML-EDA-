/* eslint-disable react/prop-types */
import { FileBraces, FileText, Upload } from "lucide-react";

const UploadEmptyState = ({ onUpload }) => {
  return (
    <div className="flex-1 p-6">
      <h3 className="text-xl font-semibold mb-1">Upload Dataset</h3>
      <p className="text-sm text-gray-500">
        Import your dataset to begin the ML pipeline
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm">
          <FileText className="h-4 w-4" />
          CSV
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm">
          <FileBraces className="h-4 w-4" />
          JSON
        </button>
      </div>
      <div className="relative mt-6 flex flex-col items-center justify-center gap-2
        border-2 border-dashed border-gray-300 rounded-lg h-64
        cursor-pointer hover:bg-gray-50"
      >
        <Upload className="h-10 w-10 text-gray-400" />
        <p className="text-sm font-medium">Drag and drop your CSV file here</p>
        <p className="text-sm text-gray-400">or click to browse files</p>
        <input
          type="file"
          accept=".csv"
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
