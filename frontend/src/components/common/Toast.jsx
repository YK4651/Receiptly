import React from "react";
import alert from "../../assets/alert.svg";
import success from "../../assets/SuccessIcon.svg";
import { useState, useEffect } from "react";

const Toast = ({ type = "success", message, title, onClose }) => {
    const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 1000);
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
    className={`fixed inset-0 bg-black/25 flex items-center justify-center z-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex bg-white flex-col items-start space-x-2 p-3 rounded-[12px] min-w-[400px]">
        {type === "error" && (
          <img src={alert} alt="error icon" className="w-[48px] h-[48px]" />
        )}
        {type === "success" && (
          <img src={success} alt="success icon" className="w-[48px] h-[48px]" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          <p className="mt-2 mb-6 text-sm text-[#667085]">{message}</p>
        </div>
        {type === "error" && (
          <button
            // style={{ backgroundColor: "#D92C20" }}
            onClick={() => setVisible(false)}
            className={`h-[44px] w-full text-white px-2 py-1 rounded-[8px] cursor-pointer bg-[#D92C20] hover:bg-white hover:text-[#D92C20] hover:border-[#D92C20] hover:border transition duration-300 font-bold `}
          >
            close
          </button>
        )}
        {type === "success" && (
          <button
          onClick={() => setVisible(false)}
            className={`h-[44px] w-full text-white px-2 py-1 rounded-[8px] cursor-pointer bg-[#2E39E6] hover:bg-white hover:text-[#2E39E6] hover:border-[#2E39E6] hover:border transition duration-300 font-bold `}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
