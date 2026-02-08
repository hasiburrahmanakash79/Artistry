import { LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-base-100 p-5 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200 ">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-[#9C1E1E] rounded-full flex items-center justify-center shadow-lg">
          <LogOut className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-2 text-base-content text-center">
          Log Out?
        </h2>
        <p className="mb-8 text-base-content/70 text-center text-sm">
          You'll need to sign in again to access your account
        </p>

        {/* Buttons */}
        <div className="flex  gap-3">
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 rounded-lg bg-[#9C1E1E] hover:bg-[#8a1515] text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Yes, Log Out
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;