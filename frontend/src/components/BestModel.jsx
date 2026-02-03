const BestModel = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Best Model</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Select Best Model</h3>
          <p className="text-sm text-gray-500">
            Select the best performing model from the comparison results
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestModel;
