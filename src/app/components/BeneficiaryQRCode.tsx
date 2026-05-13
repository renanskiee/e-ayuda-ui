// Beneficiary QR Code Display Component
import { Download } from 'lucide-react';
import { downloadQRCode } from '../utils/qrCodeGenerator';

interface BeneficiaryQRCodeProps {
  qrCodeImage?: string;
  referenceNumber?: string;
  beneficiaryName: string;
  amount: number;
  onClose?: () => void;
}

export function BeneficiaryQRCode({
  qrCodeImage,
  referenceNumber,
  beneficiaryName,
  amount,
  onClose
}: BeneficiaryQRCodeProps) {
  if (!qrCodeImage) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">QR code not generated yet</p>
      </div>
    );
  }

  const handleDownload = () => {
    if (qrCodeImage && referenceNumber) {
      downloadQRCode(qrCodeImage, `QR_${referenceNumber}`);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${referenceNumber}</title>
          <style>
            @media print {
              @page {
                size: 4in 6in;
                margin: 0.25in;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
            }
            .header {
              margin-bottom: 20px;
            }
            .header h2 {
              margin: 0 0 10px 0;
              font-size: 18px;
              color: #333;
            }
            .header p {
              margin: 5px 0;
              font-size: 12px;
              color: #666;
            }
            .qr-container {
              margin: 20px 0;
            }
            .qr-container img {
              width: 250px;
              height: 250px;
              border: 2px solid #000;
              padding: 10px;
            }
            .footer {
              margin-top: 20px;
              font-size: 11px;
              color: #666;
            }
            .footer .ref {
              font-weight: bold;
              font-size: 14px;
              color: #000;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>E-Ayuda Beneficiary QR Code</h2>
            <p><strong>Municipality of San Pascual</strong></p>
            <p>Municipal Social Welfare and Development Office</p>
          </div>

          <div class="qr-container">
            <img src="${qrCodeImage}" alt="QR Code" />
          </div>

          <div class="footer">
            <div class="ref">REF: ${referenceNumber}</div>
            <p><strong>${beneficiaryName}</strong></p>
            <p>Amount: ₱${amount.toLocaleString()}</p>
            <p style="margin-top: 15px; font-size: 10px;">
              Present this QR code along with valid ID during payout.
            </p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Beneficiary QR Code</h3>
        <p className="text-sm text-gray-600 mb-6">
          Present this QR code during payout for verification
        </p>

        {/* QR Code Display */}
        <div className="flex justify-center mb-6">
          <div className="border-4 border-gray-900 p-4 rounded-lg bg-white inline-block">
            <img
              src={qrCodeImage}
              alt="Beneficiary QR Code"
              className="w-64 h-64"
            />
          </div>
        </div>

        {/* Beneficiary Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="mb-3">
            <p className="text-xs text-gray-500 uppercase">Reference Number</p>
            <p className="text-lg font-bold text-gray-900">{referenceNumber}</p>
          </div>
          <div className="mb-3">
            <p className="text-xs text-gray-500 uppercase">Beneficiary Name</p>
            <p className="text-md font-semibold text-gray-800">{beneficiaryName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Approved Amount</p>
            <p className="text-lg font-bold text-green-600">₱{amount.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print QR
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Keep this QR code safe. You will need it to receive your assistance.
        </p>
      </div>
    </div>
  );
}
