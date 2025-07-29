import {
  AlertCircle,
  CheckCircle,
  Info,
  OctagonAlert,
  TriangleAlert,
  X,
  XCircle,
} from "lucide-react";
import React from "react";

const CustomAlertModal = ({
  isOpen,
  onClose,
  type = "success",
  title,
  message,
  confirmText = "Tamam",
  cancelText = "İptal",
  showCancel = false,
  onConfirm,
  onCancel,
}: any) => {
  if (!isOpen) return null;
  const getIcon = () => {
    const baseClass = "w-16 h-16 p-3 rounded-full shadow-lg";
    switch (type) {
      case "success":
        return (
          <CheckCircle
            className={`${baseClass} text-emerald-500 bg-gradient-to-br from-emerald-100 to-emerald-200`}
          />
        );
      case "error":
        return (
          <XCircle
            className={`${baseClass} text-rose-500 bg-gradient-to-br from-rose-100 to-rose-200`}
          />
        );
      case "warning":
        return (
          <OctagonAlert
            className={`${baseClass} text-amber-500 bg-gradient-to-br from-amber-100 to-amber-200`}
          />
        );
      case "info":
        return (
          <Info
            className={`${baseClass} text-sky-500 bg-gradient-to-br from-sky-100 to-sky-200`}
          />
        );
      default:
        return (
          <CheckCircle
            className={`${baseClass} text-emerald-500 bg-gradient-to-br from-emerald-100 to-emerald-200`}
          />
        );
    }
  };
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };
  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 fade-in duration-300 ease-out">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-8 text-center">
          <div className="flex justify-center mb-6 animate-in zoom-in duration-500 delay-150">
            {getIcon()}
          </div>

          {title && (
            <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-in slide-in-from-bottom-2 duration-400 delay-200">
              {title}
            </h2>
          )}

          {message && (
            <p className="text-gray-600 text-lg mb-8 leading-relaxed animate-in slide-in-from-bottom-2 duration-400 delay-300">
              {message}
            </p>
          )}

          <div className="flex gap-3 justify-center animate-in slide-in-from-bottom-2 duration-400 delay-400">
            {showCancel && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95">
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`px-8 py-3 rounded-xl font-semibold text-white tracking-wide 
  transition-all duration-300 transform hover:scale-105 active:scale-95 
  shadow-md hover:shadow-lg 
  ${
    type === "success"
      ? "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600"
      : type === "error"
      ? "bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600"
      : type === "warning"
      ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
      : "bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600"
  }`}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlertModal;
