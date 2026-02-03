import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const r2Data = [
  { name: "Linear", value: 0.706 },
  { name: "Ridge", value: 0.781 },
  { name: "Random", value: 0.726 },
  { name: "Gradient", value: 0.887 },
  { name: "Support", value: 0.832 },
  { name: "Neural", value: 0.843 },
];

const trainingTimeData = [
  { name: "Linear", time: 3.6 },
  { name: "Ridge", time: 2.9 },
  { name: "Random", time: 4.3 },
  { name: "Gradient", time: 2.6 },
  { name: "Support", time: 4.87 },
  { name: "Neural", time: 3.6 },
];

const featureData = [
  { name: "Id", value: 1.007 },
  { name: "MSSubClass", value: 0.95 },
  { name: "LotFrontage", value: 0.78 },
  { name: "LotArea", value: 0.68 },
  { name: "Street", value: 0.57 },
  { name: "Neighborhood", value: 0.42 },
  { name: "OverallQual", value: 0.36 },
  { name: "YearBuilt", value: 0.18 },
];

const pieTrain = [
  { name: "Correct", value: 85, fill: "#2563EB" },
  { name: "Incorrect", value: 15, fill: "#22C55E" },
];

const pieTest = [
  { name: "Correct", value: 78, fill: "#2563EB" },
  { name: "Incorrect", value: 22, fill: "#22C55E" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25, ease: "easeOut" },
};

const renderPieLabel = ({ name, percent }) =>
  `${name}: ${(percent * 100).toFixed(0)}%`;

const Visualization = () => {
  const [tab, setTab] = useState("performance");
  const exportRef = useRef(null);

  const exportPDF = async () => {
    await new Promise((r) => setTimeout(r, 400));
    const canvas = await html2canvas(exportRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("model-visualization.pdf");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-300 bg-white px-6 py-4">
        <h2 className="text-md font-semibold">Visualization</h2>
      </div>
      <div ref={exportRef} className="flex-1 p-6 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Model Visualization
          </h3>
          <p className="text-sm text-gray-500">
            Visual analysis of model performance and feature importance
          </p>
        </div>
        <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-gray-300">
          {[
            ["performance", "Model Performance"],
            ["importance", "Feature Importance"],
            ["distribution", "Prediction Distribution"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                tab === key
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {tab === "performance" && (
            <motion.div {...fadeUp} className="space-y-6">
              <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm h-85">
                <h4 className="font-semibold mb-4">R² Score Comparison</h4>
                <ResponsiveContainer width="100%" height="95%">
                  <BarChart
                    data={r2Data}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
                  >
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickMargin={10}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#2563EB"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm h-80">
                <h4 className="font-semibold mb-4">
                  Training Time (seconds)
                </h4>
                <ResponsiveContainer width="100%" height="95%">
                  <LineChart
                    data={trainingTimeData}
                    margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 8]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="#22C55E"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
          {tab === "importance" && (
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm h-100"
            >
              <h4 className="font-semibold mb-4">
                Feature Importance (Gradient Boosting)
              </h4>
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  data={featureData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 70, bottom: 10 }}
                >
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickMargin={10}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#F59E0B"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
          {tab === "distribution" && (
            <motion.div
              {...fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[["Train Set", pieTrain], ["Test Set", pieTest]].map(
                ([title, data]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm h-85"
                  >
                    <h4 className="font-semibold mb-4">{title}</h4>
                    <ResponsiveContainer width="100%" height="95%">
                      <PieChart>
                        <Pie
                          data={data}
                          dataKey="value"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={4}
                          label={renderPieLabel}
                          labelLine
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm flex items-center justify-between">
          <p className="font-semibold">Export Options</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
              Export Model (.pkl)
            </button>
            <button
              onClick={exportPDF}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Download PDF
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
