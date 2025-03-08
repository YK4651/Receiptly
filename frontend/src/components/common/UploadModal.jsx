// src/components/common/UploadModal.jsx
import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import FileInput from "../common/FileInput"; // Import the FileInput component

const UploadModal = ({ handleFileChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center">
      {/* Upload Button */}
      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white text-sm font-light px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FiUploadCloud className="w-5 h-5" />
        Upload receipt
      </button>

      {/* Modal Box */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload a file</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* FileInput Component Inside Modal */}
            <FileInput handleFileChange={handleFileChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;