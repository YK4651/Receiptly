import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const GetStartedBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate('/settings');
  };

  const handleSkipForLater = () => {
    setShowBanner(false);
  };

  return (
    showBanner && ( <div className="w-full bg-[#F5F5FF] p-5 rounded-lg flex justify-center mb-6">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-left">
          <h2 className="text-xl font-bold text-[#1A1A1A]">
            Get started with Receiptly 🎉
          </h2>
          <p className="text-[#4A4A4A] mt-2">
            You’re almost there! 🚀 Complete your signup with Receiptly and
            start managing your expenses
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleCompleteProfile}
              className="bg-[#2E39E6] text-white px-6 py-2 rounded-md hover:bg-transparent hover:text-[#2E39E6] border border-[#2E39E6] cursor-pointer transition duration-300"
            >
              Complete Profile
            </button>
            <button 
              onClick={handleSkipForLater}
              className="border border-[#2E39E6] text-[#2E39E6] px-6 py-2 rounded-md bg-transparent hover:text-white hover:bg-[#2E39E6] cursor-pointer transition duration-300">
              Skip for Later
            </button>
          </div>
        </div>
      </div>
    </div>)
  );
};

export default GetStartedBanner;