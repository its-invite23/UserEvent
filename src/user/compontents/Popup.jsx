import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ isOpen, onClose, content, size }) => {
  if (!isOpen) return null; // Render nothing if the popup is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1B1B1B] bg-opacity-50 z-50">
      <div className={`bg-[#1B1B1B] rounded-lg shadow-lg w-[90%] ${size} overflow-y-auto`}>
        <div className="flex justify-end items-end px-4 py-3 border-b border-gray-700">
          <button onClick={onClose} className="text-white focus:outline-none">
            <IoCloseSharp size={24} />
          </button>
        </div>
        <div className="p-4 text-gray-700">{content}</div>
      </div>
    </div>
  );
};

export default Popup;
