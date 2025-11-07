import React, { useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ isOpen, onClose, content, size, heading }) => {
  const popupRef = useRef(null);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    // Close only if user clicks outside the modal content
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 !z-[9999]"
      onClick={handleBackgroundClick}
    >
      <div
        ref={popupRef}
        className={`bg-[#1B1B1B] rounded-lg shadow-lg ${size} transition-transform duration-300 scale-100`}
      >
        {/* Header with title + close button */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            {heading ? heading : ""}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 transition"
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-gray-300 overflow-y-auto max-h-[80vh]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popup;
