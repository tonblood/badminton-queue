import React from "react";

interface ModalProps {
  isVisible: boolean; // ต้องระบุ property นี้
  onClose: () => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 transition-opacity ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full rounded-t-2xl p-4 transform transition-transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // ป้องกันการปิด Modal เมื่อคลิกด้านใน
      >
        <div className="h-1 w-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

