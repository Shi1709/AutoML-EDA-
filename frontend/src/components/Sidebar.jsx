/* eslint-disable react/prop-types */
import {
  Upload,
  Code,
  Target,
  Split,
  Play,
  BarChart3,
  Layers,
  Eraser,
  GitBranch,
  Trophy,
  ClipboardCheck,
  ChartLine,
  BrainCircuit,
} from "lucide-react";

const steps = [
  { id: 1, title: "Upload Data", desc: "Import dataset", icon: Upload },
  {
    id: 2,
    title: "Data Cleaning",
    desc: "Handle missing values",
    icon: Eraser,
  },
  {
    id: 3,
    title: "Correlation",
    desc: "Remove redundant features",
    icon: GitBranch,
  },
  { id: 4, title: "Encoding", desc: "Transform categorical data", icon: Code },
  {
    id: 5,
    title: "Target Selection",
    desc: "Choose prediction target",
    icon: Target,
  },
  { id: 6, title: "Train/Test Split", desc: "Divide dataset", icon: Split },
  { id: 7, title: "Model Training", desc: "Train ML models", icon: Play },
  {
    id: 8,
    title: "Compare Models",
    desc: "Evaluate performance",
    icon: BarChart3,
  },
  { id: 9, title: "PCA", desc: "Dimensionality reduction", icon: Layers },
  { id: 10, title: "Best Model", desc: "Select optimal model", icon: Trophy },
  { id: 11, title: "Evaluation", desc: "Final metrics", icon: ClipboardCheck },
  { id: 12, title: "Visualization", desc: "Data insights", icon: ChartLine },
];

const Sidebar = ({ activeStep, setActiveStep, completedSteps }) => {
  return (
    <aside className="h-full w-65 border-r border-gray-300 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-300">
        <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
          <BrainCircuit size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-lg">AutoML-EDA</h1>
          <p className="text-xs text-gray-500">Automation Platform</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {steps.map((step) => (
          <SidebarItem
            key={step.id}
            step={step}
            active={activeStep === step.id}
            completedSteps={completedSteps}
            onClick={() => setActiveStep(step.id)}
          />
        ))}
      </div>
    </aside>
  );
};

const SidebarItem = ({ step, active, onClick, completedSteps }) => {
  const Icon = step.icon;

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer relative w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all ${
        active ? "bg-blue-50 shadow-sm" : "hover:bg-gray-50"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600" />
      )}
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          completedSteps.includes(step.id)
            ? "bg-green-500 text-white"
            : active
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
        }`}
      >
        {completedSteps.includes(step.id) ? "✓" : step.id}
      </div>

      <div className="flex-1 leading-tight">
        <p
          className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-800"}`}
        >
          {step.title}
        </p>
        <p className="text-xs text-gray-500">{step.desc}</p>
      </div>
      <Icon
        size={16}
        className={`${active ? "text-blue-600" : "text-gray-400"} mt-1`}
      />
    </button>
  );
};

export default Sidebar;
