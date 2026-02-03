import { useState } from "react";
import ActivityLog from "../components/ActivityLog"
import Sidebar from "../components/Sidebar"
import Workspace from "../components/Workspace"

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="grid grid-cols-[260px_1fr_320px] min-h-screen">
      <Sidebar activeStep={activeStep} setActiveStep={setActiveStep} />
      <Workspace activeStep={activeStep} />
      <ActivityLog />
    </div>
  )
}

export default Dashboard