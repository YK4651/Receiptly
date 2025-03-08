import { useState } from "react";
import { HelpCircle } from "lucide-react";

const HelpTooltip = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Help Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HelpCircle className="w-5 h-5 text-blue-700" />
      </div>

      {/* Tooltip Popup - Appears at Top */}
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-64 bg-gray-200/90 text-black text-sm p-3 rounded-lg shadow-lg border border-gray-300 text-left whitespace-pre-line">
          {message}
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;
