import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import FileInput from "../common/FileInput";
import { analyzeReceipt } from "../../api/receipts";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal"; 
import Toast from "../common/Toast";

const UploadModal = ({ handleFileChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const [toast, setToast] = useState({ message: null, type: "success", title: null });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
    setShowAnalyzeButton(files.length > 0);
  };

  const handleAnalyze = async (files) => {
    if (files.length === 0) {
      return;
    }

    setIsLoading(true);
    setProgress(0);

    const options = {
      maxSizeMB: 0.1, // 100KB
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      let base64Images = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result.split(",")[1];
          base64Images.push(base64Image);

          if (base64Images.length === files.length) {
            analyzeImages(base64Images, files);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error compressing file:", error);
      setToast({
        message: "Error occured when compressing file. Please try again later",
        type: "error",
        title: error.message,
    });
      setIsLoading(false);
    } finally {
      setProgress(100);
    }
  };

  const analyzeImages = async (base64Images, files) => {
    try {
      const result = await analyzeReceipt(base64Images);
      const textAnnotations = result?.results;
      console.log("Result:", result.results);
      if (textAnnotations && textAnnotations.length > 0) {
        handleFileChange({ ...result, images: files }); // Pass the analyzed data and images back to Receipts.jsx
        // toast.success("Analysis completed successfully!");
      } else {
        toast.warn("Text not found in the images.");
      }
      setIsOpen(false); // Close the modal after successful analysis
    } catch (error) {
      console.error("Error:", error);
      setToast({
        message: "An error occured during analysis. Please try again later",
        type: "error",
        title: error.message,
    });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="flex flex-col items-left">
      <button
        onClick={toggleModal}
        className="bg-[#2E39E6] hover:bg-white hover:text-[#2E39E6] text-white text-sm font-light px-4 py-2 rounded-lg flex items-center gap-2 border cursor-pointer transition duration-300"
      >
        <FiUploadCloud className="w-5 h-5" />
        Upload receipt
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end items-start">
          <div className="bg-white p-6 w-[82%] h-full max-h-[100vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload a file</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {isLoading && (
              <div className="mt-4">
                <LoadingSpinner />
                <h2 className="text-center text-xl mt-4">We're working on your receipts</h2>
                <h4 className="text-center mt-4 text-gray-400">hang in there, we'll be done in a bit.</h4>
              </div>
            )}

          <div className="overflow-y-auto flex-grow">
          {!isLoading && (
            <FileInput handleFileChange={handleFilesChange} isLoading={isLoading} fileNames={selectedFiles.map(file => file.name)} progress={progress} />
          )}
        </div>

            {showAnalyzeButton && !isLoading && (
              <button
                onClick={() => handleAnalyze(selectedFiles)}
                 className="bg-[#2E39E6] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white hover:text-[#2E39E6] border cursor-pointer transition duration-300  mt-4 w-50 absolute right-5 bottom-5 text-center"
              >
                Analyze receipt
              </button>
            )}
          </div>
        </div>
      )}
       {toast.message && (
          <Toast
            type={toast.type}
            message={toast.message}
            title={toast.error || toast.title}
            onClose={() => setToast({ ...toast, message: null })}
          />
        )}
    </div>
  );
};

export default UploadModal;