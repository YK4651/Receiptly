import React, { useEffect } from 'react';

const SuccessModal = ({ isOpen, onClose, onDashboard }) => {
  // Close modal when clicking on the overlay background
  useEffect(() => {
    function handleClickOutside(event) {
      // If the user clicks the overlay (i.e., has the class 'modal-overlay'), close the modal
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-md p-6 rounded-md relative shadow-lg">
        {/* Close Button (X) */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col">
        {/* Success Icon */}
        <img
            src="/src/assets/SuccessIcon.svg"
            alt="Success Icon"
            className="w-16 h-16 mb-4"
        />

        <h2 className="text-xl font-semibold mb-6">
            User Details Updated Successfully!
        </h2>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            onClick={onDashboard}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
