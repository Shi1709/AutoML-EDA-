import { useState } from "react";
import ActivityLog from "../components/ActivityLog";
import Sidebar from "../components/Sidebar";
import Workspace from "../components/Workspace";

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [pipelineId, setPipelineId] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const goToStep = (nextStep) => {
    setCompletedSteps((prev) =>
      prev.includes(activeStep) ? prev : [...prev, activeStep],
    );
    setActiveStep(nextStep);
  };

  return (
    <div className="grid grid-cols-[260px_1fr_320px] h-full">
      <Sidebar
        activeStep={activeStep}
        completedSteps={completedSteps}
        setActiveStep={setActiveStep}
      />

      <Workspace
        activeStep={activeStep}
        goToStep={goToStep}
        pipelineId={pipelineId}
        setPipelineId={setPipelineId}
        uploadData={uploadData}
        setUploadData={setUploadData}
      />

      <ActivityLog />
    </div>
  );
};

export default Dashboard;
