const Encoding = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 px-6 py-4">
        <h2 className="text-md font-semibold">Encoding</h2>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Feature Encoding</h3>
          <p className="text-sm text-gray-500">
            Transform categorical features into numerical format for model training
          </p>
        </div>
      </div>
    </div>
  );
};

export default Encoding;
