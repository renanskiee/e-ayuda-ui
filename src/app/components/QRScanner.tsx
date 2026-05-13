import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  show: boolean;
  onScan: (code: string) => void;
  onClose: () => void;
}

export default function QRScanner({ show, onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = 'qr-reader';

  useEffect(() => {
    if (show && !isScanning) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
  }, [show]);

  const startScanning = async () => {
    try {
      setError(null);
      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          // QR Code scanned successfully
          onScan(decodedText);
          stopScanning();
          onClose();
        },
        (errorMessage) => {
          // Scanning failed, no action needed
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error('Error starting QR scanner:', err);
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  const handleClose = async () => {
    await stopScanning();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Camera className="w-6 h-6" />
              Scan QR Code
            </h3>
            <p className="text-blue-100 text-sm mt-1">Position QR code within the frame</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Camera Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <p className="text-xs text-red-600 mt-2">
                  Make sure you've granted camera permissions and no other app is using the camera.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                id={qrCodeRegionId}
                className="w-full rounded-lg overflow-hidden border-2 border-blue-200"
                style={{ minHeight: '300px' }}
              ></div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Instructions:</strong>
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                  <li>Hold your device steady</li>
                  <li>Position the QR code within the blue frame</li>
                  <li>Ensure good lighting for better scanning</li>
                  <li>QR code will be automatically detected</li>
                </ul>
              </div>
            </>
          )}

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
