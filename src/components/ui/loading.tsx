import React from "react";

const Loading = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-4"></div>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default Loading;
