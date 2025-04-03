import React, { useRef, useState, useEffect } from "react";

const CameraCapture = ({ onCapture }) => {
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      const drawFrame = async () => {
        const frame = await imageCapture.grabFrame();
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = frame.width;
        canvas.height = frame.height;

        context.drawImage(frame, 0, 0);

        if (!isCaptured && !isCancelled) {
          requestAnimationFrame(drawFrame);
        }
      };

      drawFrame();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/jpeg");

    stopCamera();
    setIsCaptured(true);
    processImage(imageData);
  };

  const stopCamera = () => {
    const stream = canvasRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const processImage = (imageData) => {
    const base64Image = imageData.split(",")[1];
    if (onCapture) {
      onCapture(base64Image);
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setIsCaptured(false);
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {!isCaptured && !isCancelled && (
        <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />
      )}
      {!isCaptured && !isCancelled && (
        <button
          onClick={captureImage}
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#2E39E6",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            transition: "background-color 0.3s",
          }}
        >
          Capture Image
        </button>
      )}
      {(!isCaptured && !isCancelled) && (
        <button
          onClick={handleCancel}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#FF3B30",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default CameraCapture;
