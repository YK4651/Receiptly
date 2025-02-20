import { useState } from "react";
import { analyzeReceipt, saveReceipt } from "../api/receipts";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Button from "./Button";
import FileInput from "./FileInput";
import LoadingSpinner from "./LoadingSpinner";
import ResultsTable from "./ResultsTable";
import Reports from "./Reports";
import CreateCategory from "./CreateCategory";
import Modal from "./Modal";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [detectedText, setDetectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updatedData, setUpdatedData] = useState(null);

  const handleFileChange = (files) => {
    setSelectedFiles(files);
    setDetectedText(""); // Clear out the table
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) {
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

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result.split(",")[1];
          base64Images.push(base64Image);

          if (base64Images.length === selectedFiles.length) {
            analyzeImages(base64Images);
          }
        };
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.error("Error compressing file:", error);
      toast.error("Error compressing file.");
      setIsLoading(false);
    }
  };

  const analyzeImages = async (base64Images) => {
    try {
      const result = await analyzeReceipt(base64Images);
      const textAnnotations = result?.results;
      console.log("Result:", result.results);
      if (textAnnotations && textAnnotations.length > 0) {
        const detectedText = JSON.stringify(result, null, 2);
        setDetectedText(detectedText);
        setUpdatedData(result); // Set the initial data for editing
        toast.success("Analysis completed successfully!");
      } else {
        toast.warn("Text not found in the images.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during analysis.");
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  const handleSaveReceipt = async () => {
    if (updatedData) {
      setIsLoading(true);
      setProgress(0);
  
      try {
        const base64Images = selectedFiles.map(file => {
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
            reader.onload = (event) => {
              resolve(event.target.result.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });
  
        const images = await Promise.all(base64Images);
  
        await saveReceipt(JSON.stringify(updatedData), images);
        // Clear everything after saving
        setSelectedFiles([]);
        setDetectedText("");
        setUpdatedData(null);
        toast.success("Receipt saved successfully!");
      } catch (error) {
        toast.error("Error saving receipt.");
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <Routes>
        <Route path="/" element={
          <>
            <FileInput handleFileChange={handleFileChange} isLoading={isLoading} fileNames={selectedFiles.map(file => file.name)} progress={progress} />
            
            {detectedText && <ResultsTable data={JSON.parse(detectedText)} onUpdate={setUpdatedData} />}
            {selectedFiles.length > 0 && (
              <div className="flex space-x-4">
                {!detectedText && (
                  <Button
                    onClick={handleAnalyze}
                    className={`mt-4 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500"}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Detecting..." : "Scan Receipts"}
                  </Button>
                )}
                {detectedText && (
                  <Button
                    className="mt-4 bg-gray-500"
                    onClick={handleSaveReceipt}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Results"}
                  </Button>
                )}
              </div>
            )}
            <Modal isOpen={isLoading} onClose={() => {}}>
              <LoadingSpinner />
              <h2 className="text-center text-xl mt-4">We're categorizing your receipts</h2>
              <h4 className="text-center mt-4 text-gray-400">hang in there, we'll be done in a bit.</h4>
            </Modal>
            <ToastContainer />
          </>
        } />
        <Route path="/reports" element={<Reports />} />
        <Route path="/create-category" element={<CreateCategory />} />
      </Routes>
    </div>
  );
};

export default App;