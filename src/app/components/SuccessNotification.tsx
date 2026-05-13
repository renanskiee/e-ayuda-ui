import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessNotification({ show, title, message, onClose }: SuccessNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slideInRight">
      <div className="bg-white rounded-xl shadow-2xl border-l-4 border-green-500 p-6 max-w-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
