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

const Workspace = ({ activeStep }) => {
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <UploadWorkspace />;
      case 2:
        return <DataCleaning />;
      case 3:
        return <Correlation />;
      case 4:
        return <Encoding />;
      case 5:
        return <TargetSelection />;
      case 6:
        return <Split />;
      case 7:
        return <ModelTraining />;
      case 8:
        return <Comparison />;
      case 9:
        return <PCA />;
      case 10:
        return <BestModel />;
      case 11:
        return <Evaluation />;
      case 12:
        return <Visualization />;
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
