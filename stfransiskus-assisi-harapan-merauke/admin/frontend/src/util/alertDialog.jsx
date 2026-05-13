import React from 'react';

const AlertDialogModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Lanjutkan", 
  type = "danger" // 'danger', 'info', atau 'success'
}) => {
  if (!isOpen) return null;

  const themes = {
    danger: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700",
    success: "bg-green-600 hover:bg-green-700"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600 leading-relaxed">
          {description}
        </p>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${themes[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialogModal;