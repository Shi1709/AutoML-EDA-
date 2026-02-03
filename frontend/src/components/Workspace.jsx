/* eslint-disable react/prop-types */
import UploadWorkspace from "./UploadWorkspace";

const Workspace = ({ activeStep }) => {
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <UploadWorkspace />;
      case 2:
        return <div className="p-6">Data Cleaning</div>;
      case 3:
        return <div className="p-6">Correlation</div>;
      case 4:
        return <div className="p-6">Encoding</div>;
      case 5:
        return <div className="p-6">Target Selection</div>;
      case 6:
        return <div className="p-6">Train/Test Split</div>;
      case 7:
        return <div className="p-6">Model Training</div>;
      case 8:
        return <div className="p-6">Compare Models</div>;
      case 9:
        return <div className="p-6">PCA</div>;
      case 10:
        return <div className="p-6">Best Model</div>;
      case 11:
        return <div className="p-6">Evaluation</div>;
      case 12:
        return <div className="p-6">Visualization</div>;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      {renderStep()}
    </main>
  );
};

export default Workspace;
