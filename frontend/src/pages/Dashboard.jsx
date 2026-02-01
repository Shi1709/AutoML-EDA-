import ActivityLog from "../components/ActivityLog"
import Sidebar from "../components/Sidebar"
import Workspace from "../components/Workspace"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[260px_1fr_320px] min-h-screen">
      <Sidebar />
      <Workspace />
      <ActivityLog />
    </div>
  )
}

export default Dashboard