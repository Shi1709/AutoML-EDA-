/* eslint-disable react/prop-types */
import UploadEmptyState from "./UploadEmptyState";
import UploadPreviewState from "./UploadPreviewState";

const UploadWorkspace = ({
  goToStep,
  setPipelineId,
  uploadData,
  setUploadData,
}) => {

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/pipeline/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    setUploadData(result);
    setPipelineId(result.pipeline_id);
  };

  if (!uploadData) {
    return <UploadEmptyState onUpload={handleUpload} />;
  }

  return (
    <UploadPreviewState
      data={uploadData}
      onRemove={() => setUploadData(null)}
      goToStep={goToStep}
    />
  );
};

export default UploadWorkspace;
