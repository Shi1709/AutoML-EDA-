/* eslint-disable react/prop-types */
import Correlation from "./Correlation";
import DataCleaning from "./DataCleaning";
import Encoding from "./Encoding";
import UploadWorkspace from "./UploadWorkspace";
import TargetSelection from "./TargetSelection";
import ModelTraining from "./ModelTraining";
import Comparison from "./Comparison";
import PCA from "./PCA";
import BestModel from "./BestModel";
import Evaluation from "./Evaluation";
import Visualization from "./Visualization";
import Split from "./Split";

const Workspace = ({ activeStep, goToStep, pipelineId, setPipelineId, uploadData, setUploadData }) => {
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <UploadWorkspace
            goToStep={goToStep}
            setPipelineId={setPipelineId}
            uploadData={uploadData}
            setUploadData={setUploadData}
          />
        );
      case 2:
        return <DataCleaning goToStep={goToStep} pipelineId={pipelineId} />;
      case 3:
        return <Correlation goToStep={goToStep} pipelineId={pipelineId} />;
      case 4:
        return <Encoding goToStep={goToStep} pipelineId={pipelineId}/>;
      case 5:
        return <TargetSelection goToStep={goToStep} pipelineId={pipelineId}/>;
      case 6:
        return <Split goToStep={goToStep} pipelineId={pipelineId}/>;
      case 7:
        return <ModelTraining goToStep={goToStep} pipelineId={pipelineId}/>;
      case 8:
        return <Comparison goToStep={goToStep} pipelineId={pipelineId}/>;
      case 9:
        return <PCA goToStep={goToStep} pipelineId={pipelineId}/>;
      case 10:
        return <BestModel goToStep={goToStep} pipelineId={pipelineId}/>;
      case 11:
        return <Evaluation goToStep={goToStep} pipelineId={pipelineId}/>;
      case 12:
        return <Visualization goToStep={goToStep} pipelineId={pipelineId}/>;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">{renderStep()}</main>
  );
};

export default Workspace;
