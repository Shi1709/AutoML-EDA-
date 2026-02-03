import { useState } from "react";
import UploadEmptyState from "./UploadEmptyState";
import UploadPreviewState from "./UploadPreviewState";

const UploadWorkspace = () => {
  const [file, setFile] = useState(null);

  const handleUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Upload</h2>
      </div>
      {!file ? (
        <UploadEmptyState onUpload={handleUpload} />
      ) : (
        <UploadPreviewState file={file} onRemove={handleRemove} />
      )}
    </div>
  );
};

export default UploadWorkspace;
