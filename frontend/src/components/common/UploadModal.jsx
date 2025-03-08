import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import FileInput from "../common/FileInput";
import { analyzeReceipt } from "../../api/receipts";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";

const UploadModal = ({ handleFileChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);

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
      toast.error("Error compressing file.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
        toast.success("Analysis completed successfully!");
      } else {
        toast.warn("Text not found in the images.");
      }
      setIsOpen(false); // Close the modal after successful analysis
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during analysis.");
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white text-sm font-light px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FiUploadCloud className="w-5 h-5" />
        Upload receipt
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload a file</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <FileInput handleFileChange={handleFilesChange} isLoading={isLoading} fileNames={selectedFiles.map(file => file.name)} progress={progress} />

            {showAnalyzeButton && (
              <button
                onClick={() => handleAnalyze(selectedFiles)}
                className="bg-green-600 text-white text-sm font-light px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition mt-4"
              >
                Analyze receipt
              </button>
            )}

            {isLoading && (
              <div className="mt-4">
                <LoadingSpinner />
                <h2 className="text-center text-xl mt-4">We're working on your receipts</h2>
                <h4 className="text-center mt-4 text-gray-400">hang in there, we'll be done in a bit.</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;