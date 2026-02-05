/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import UploadEmptyState from "./UploadEmptyState";
import UploadPreviewState from "./UploadPreviewState";

const UploadWorkspace = ({ goToStep }) => {
  const [pipelineId, setPipelineId] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://127.0.0.1:8000/pipeline/upload",
      formData
    );

    setPipelineId(res.data.pipeline_id);
    setUploadData(res.data);
  };

  const handleRemove = () => {
    setPipelineId(null);
    setUploadData(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Upload</h2>
      </div>

      {!uploadData ? (
        <UploadEmptyState onUpload={handleUpload} />
      ) : (
        <UploadPreviewState
          pipelineId={pipelineId}
          data={uploadData}
          onRemove={handleRemove}
          goToStep={goToStep}
        />
      )}
    </div>
  );
};

export default UploadWorkspace;
