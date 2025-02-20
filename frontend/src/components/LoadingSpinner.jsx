import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;