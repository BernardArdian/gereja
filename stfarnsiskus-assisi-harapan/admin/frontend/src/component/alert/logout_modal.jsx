import { X, AlertCircle } from "lucide-react";
import { createPortal } from "react-dom";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop khusus Modal */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Card Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
              <AlertCircle size={24} />
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out?</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Apakah Anda yakin ingin keluar? Sesi Anda akan berakhir dan Anda
            harus login kembali.
          </p>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-2">
          <button
            onClick={onConfirm}
            className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Ya, Keluar
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
