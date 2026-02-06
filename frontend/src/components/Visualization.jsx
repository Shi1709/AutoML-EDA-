import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* eslint-disable react/prop-types */

const Visualization = ({ pipelineId }) => {
  const [data, setData] = useState(null);
  const exportRef = useRef(null);

  useEffect(() => {
    if (!pipelineId) return;

    fetch(
      `http://127.0.0.1:8000/pipeline/visualization?pipeline_id=${pipelineId}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Visualization API response:", res);
        setData(res);
      })
      .catch(console.error);
  }, [pipelineId]);

  const exportPDF = async () => {
    await new Promise((r) => setTimeout(r, 300));

    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      onclone: (doc) => {
        doc.querySelectorAll("*").forEach((el) => {
          const style = window.getComputedStyle(el);

          if (style.color.includes("oklch")) {
            el.style.color = "rgb(0,0,0)";
          }

          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "rgb(255,255,255)";
          }

          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "rgb(220,220,220)";
          }
        });
      },
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("model-performance.pdf");
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Loading visualization…
      </div>
    );
  }

  const scoreData = data.model_scores || [];
  const timeData = data.training_time || [];
  const memoryData = data.memory_usage || [];

  if (scoreData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No visualization data available
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-300 bg-white px-6 py-4">
        <h2 className="text-md font-semibold">Visualization</h2>
      </div>
      <div ref={exportRef} className="flex-1 p-8 space-y-14 bg-white">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Model Performance Summary
          </h3>
          <p className="text-sm text-gray-500">
            Average metrics across 3 training runs
          </p>
        </div>
        <div className="rounded-xl border border-gray-300 p-8">
          <h4 className="font-semibold mb-4">Model Score Comparison</h4>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={scoreData} layout="vertical">
              <XAxis type="number" domain={[0, 1]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Bar dataKey="value" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-gray-300 p-8">
          <h4 className="font-semibold mb-4">Avg Training Time (seconds)</h4>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={timeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Line
                type="monotone"
                dataKey="time"
                stroke="#16A34A"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-gray-300 p-6">
          <h4 className="font-semibold mb-4">Avg Memory Usage (MB)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memoryData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Bar dataKey="memory" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border-t bg-white px-6 py-4 flex justify-end gap-3">
        <button
          onClick={exportPDF}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Visualization;
