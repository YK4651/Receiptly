import { useState } from "react";
import { analyzeReceipt, saveReceipt } from "../../api/receipts";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Button from "../common/Button";
import FileInput from "../common/FileInput";
import LoadingSpinner from "../common/LoadingSpinner";
import ResultsTable from "../pages/Receipt/ResultsTable";
import Reports from "../pages/Reports/Reports";
import Modal from "../common/Modal";
import * as pdfjsLib from "pdfjs-dist";
import Dashboard from "./Dashboard";

// Set the workerSrc for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [detectedText, setDetectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updatedData, setUpdatedData] = useState(null);


async function renderToBase64(pdfPage) {
  const viewport = pdfPage.getViewport({ scale: 1.0 });

  // Create a canvas element
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render the PDF page into the canvas context
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await pdfPage.render(renderContext).promise;

  // Convert the canvas to a Base64 string
  return canvas.toDataURL("image/png").split(",")[1];
}

  // Not so related
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
        if (file.type === "application/pdf") {
          // Use pdfjs-dist to load and process PDF
          const loadingTask = pdfjsLib.getDocument(await file.arrayBuffer());
          const pdf = await loadingTask.promise;
          for (let j = 1; j <= pdf.numPages; j++) {
            const page = await pdf.getPage(j);
            const base64Image = await renderToBase64(page);
            base64Images.push(base64Image);
            console.log(base64Images);
          }
        } else {
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
      }
      if (base64Images.length === selectedFiles.length) {
        await analyzeImages(base64Images);
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
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <ToastContainer/>
      </Routes>
  );
};

export default App;