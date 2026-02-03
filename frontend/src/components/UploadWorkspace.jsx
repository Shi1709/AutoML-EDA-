import { FileBraces, FileText, Upload } from "lucide-react";

const UploadWorkspace = () => {
  return (
    <>
      <div className="border-b border-gray-300 px-6 py-3">
        <h2 className="text-md font-semibold mb-2">Upload</h2>
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-1">Upload Dataset</h3>
        <p className="text-sm text-gray-500">
          Import your dataset to begin the ML pipeline
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2
               px-4 py-2
               rounded-md border border-gray-200
               text-sm font-medium text-gray-700
               hover:bg-gray-50 hover:border-gray-300
               transition-colors"
          >
            <FileText className="h-4 w-4 text-gray-500" />
            CSV
          </button>
          <button
            className="inline-flex items-center gap-2
               px-4 py-2
               rounded-md border border-gray-200
               text-sm font-medium text-gray-700
               hover:bg-gray-50 hover:border-gray-300
               transition-colors"
          >
            <FileBraces className="h-4 w-4 text-gray-500" />
            JSON
          </button>
        </div>
        <div
          className="relative mt-6 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg h-64 cursor-pointer transition hover:border-gray-400 hover:bg-gray-50"
        >
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Drag and drop your CSV file here
          </p>
          <p className="text-sm text-gray-400 whitespace-nowrap">
            or click to browse files
          </p>
          <input
            type="file"
            accept=".csv"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default UploadWorkspace;
