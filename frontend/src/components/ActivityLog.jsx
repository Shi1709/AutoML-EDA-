const ActivityLog = () => {
  const events = [
    {
      text: "Navigated to upload step",
      time: "2:16:20 AM",
      tag: "upload",
    },
    {
      text: "Navigated to cleaning step",
      time: "2:08:23 AM",
      tag: "cleaning",
    },
  ];

  return (
    <div className="h-screen w-80 border-l border-gray-200 bg-white flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Activity Log</h2>
        <p className="text-xs text-gray-400">{events.length} events</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span
              className="mt-0.5 inline-flex items-center justify-center
                         w-4 h-4 rounded-full
                         border border-gray-400
                         text-[10px] font-semibold text-gray-500">
              i
            </span>
            <div>
              <p className="text-sm text-gray-700">{event.text}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-400">{event.time}</span>
                <span
                  className="rounded bg-gray-100 px-2 py-0.5
                             text-xs text-gray-500">
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
