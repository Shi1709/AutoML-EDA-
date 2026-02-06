import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const ActivityLog = ({ pipelineId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!pipelineId) return;

    const fetchLogs = () => {
      fetch(
        `http://127.0.0.1:8000/pipeline/activity?pipeline_id=${pipelineId}`
      )
        .then((res) => res.json())
        .then((data) => setEvents(data.events || []))
        .catch(console.error);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000); 
    return () => clearInterval(interval);
  }, [pipelineId]);

  return (
    <div className="h-full w-80 border-l border-gray-200 bg-white flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">
          Activity Log
        </h2>
        <p className="text-xs text-gray-400">
          {events.length} events
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {events.length === 0 && (
          <p className="text-xs text-gray-400">
            No activity yet
          </p>
        )}

        {events.map((event, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm text-gray-700">
                {event.text}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-400">
                  {event.time}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {event.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
