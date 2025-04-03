import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="fixed inset-0 bg-black opacity-70 transition-opacity duration-300"></div>
      <div
        className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl w-full mx-4 transition-transform duration-300"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
        }}
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent text-white rounded-full px-5 py-3"
        >
          &times;
        </button>
        <div className="overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;