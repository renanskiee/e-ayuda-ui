import { useRef } from 'react';
import { Printer, X } from 'lucide-react';

interface DisbursementVoucherProps {
  show: boolean;
  application: any;
  onClose: () => void;
}

export default function DisbursementVoucher({ show, application, onClose }: DisbursementVoucherProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!show || !application) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Disbursement Voucher - ${application.referenceNumber}</title>
          <style>
            @media print {
              @page {
                size: letter;
                margin: 0.5in;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 11pt;
            }
            .voucher-container {
              width: 100%;
              max-width: 8.5in;
              margin: 0 auto;
              border: 2px solid black;
            }
            .voucher-header {
              text-align: center;
              border-bottom: 2px solid black;
              padding: 8px;
            }
            .voucher-header h3 {
              margin: 2px 0;
              font-size: 11pt;
              font-weight: normal;
            }
            .voucher-header h2 {
              margin: 4px 0;
              font-size: 13pt;
              font-weight: bold;
            }
            .voucher-row {
              display: flex;
              border-bottom: 1px solid black;
              min-height: 30px;
            }
            .voucher-cell {
              padding: 4px 8px;
              border-right: 1px solid black;
              flex: 1;
            }
            .voucher-cell:last-child {
              border-right: none;
            }
            .voucher-label {
              font-weight: bold;
              font-size: 9pt;
            }
            .voucher-value {
              font-size: 10pt;
              margin-top: 2px;
            }
            .amount-section {
              text-align: right;
              font-weight: bold;
              font-size: 12pt;
            }
            .checkbox {
              display: inline-block;
              width: 14px;
              height: 14px;
              border: 1px solid black;
              margin: 0 4px;
              vertical-align: middle;
            }
            .checkbox.checked::after {
              content: 'X';
              display: block;
              text-align: center;
              line-height: 14px;
              font-weight: bold;
            }
            .signature-section {
              display: flex;
              border-top: 2px solid black;
            }
            .signature-box {
              flex: 1;
              border-right: 1px solid black;
              padding: 8px;
              min-height: 120px;
            }
            .signature-box:last-child {
              border-right: none;
            }
            .signature-line {
              border-top: 1px solid black;
              margin-top: 40px;
              padding-top: 2px;
              font-size: 9pt;
            }
            .description-area {
              min-height: 80px;
              padding: 8px;
              border-bottom: 1px solid black;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            td {
              border: 1px solid black;
              padding: 4px 8px;
            }
            .no-border-right {
              border-right: none;
            }
            .no-border-bottom {
              border-bottom: none;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentUser = localStorage.getItem('username') || 'disb-001';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">Disbursement Voucher</h3>
            <p className="text-green-100 text-sm mt-1">Print receipt for beneficiary</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Voucher Content */}
        <div className="p-6">
          <div ref={printRef} className="bg-white">
            <div className="voucher-container border-2 border-black">
              {/* Header */}
              <div className="voucher-header border-b-2 border-black text-center py-2">
                <h3 className="text-xs font-normal">Republic of the Philippines</h3>
                <h3 className="text-xs font-normal">Province of Masbate</h3>
                <h3 className="text-xs font-normal">Municipality of San Pascual</h3>
                <div className="flex items-center justify-between px-4 mt-2">
                  <div className="flex-1"></div>
                  <h2 className="text-base font-bold">DISBURSEMENT VOUCHER</h2>
                  <div className="flex-1 text-right text-xs">
                    No. <span className="font-bold">{application.referenceNumber}</span>
                  </div>
                </div>
              </div>

              {/* Mode of Payment */}
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-32 font-bold text-xs">Mode of Payment</td>
                    <td className="text-xs">
                      Check <span className="inline-block w-3 h-3 border border-black mx-2"></span>
                      <span className="font-bold">x</span>
                      Cash <span className="inline-block w-3 h-3 border border-black mx-2"><span className="font-bold">X</span></span>
                      Others <span className="inline-block w-3 h-3 border border-black mx-2"></span>
                    </td>
                  </tr>

                  {/* Payee Information */}
                  <tr>
                    <td className="font-bold text-xs">Payee</td>
                    <td colSpan={3}>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="text-xs font-bold">Name</div>
                          <div className="text-xs">{application.applicantName}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold">TIN/Employee no.</div>
                          <div className="text-xs">N/A</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold">Obligation Request No.</div>
                          <div className="text-xs">{application.id}</div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Address */}
                  <tr>
                    <td className="font-bold text-xs">Address</td>
                    <td colSpan={2}>
                      <div className="text-xs font-bold">Address</div>
                      <div className="text-xs">{application.barangay ? `Brgy. ${application.barangay}, San Pascual, Masbate` : 'San Pascual, Masbate'}</div>
                    </td>
                    <td className="w-48">
                      <div className="text-xs font-bold">Responsibility Center Code</div>
                      <div className="text-xs">MSWDO-{application.sector.substring(0, 3).toUpperCase()}</div>
                    </td>
                  </tr>

                  {/* Amount Header */}
                  <tr>
                    <td colSpan={3}></td>
                    <td className="text-right font-bold text-xs">AMOUNT</td>
                  </tr>

                  {/* Description */}
                  <tr>
                    <td colSpan={3} className="align-top">
                      <div className="text-xs italic p-2">
                        For payment for {application.program} in the amount of
                      </div>
                      <div className="min-h-[60px]"></div>
                    </td>
                    <td className="text-right align-top pt-2 font-bold">
                      ₱{application.recommendedAmount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>

                  {/* Total Amount */}
                  <tr>
                    <td colSpan={3}></td>
                    <td className="text-right font-bold border-t-2 border-black">
                      ₱{application.recommendedAmount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Signature Section */}
              <div className="grid grid-cols-2 border-t-2 border-black">
                {/* Left Column - Certified */}
                <div className="border-r border-black p-3">
                  <div className="text-xs font-bold mb-2">Certified</div>
                  <div className="text-[10px] mb-1">Allotment obligation for the purpose as indicated above</div>
                  <div className="text-[10px] mb-3">Supporting documents complete</div>

                  <div className="mt-8">
                    <div className="border-t border-black pt-1 text-xs text-center font-bold">
                      JENELYN J. MATANDAG
                    </div>
                    <div className="text-[10px] text-center">Municipal Accountant</div>
                    <div className="text-[10px] text-center mt-1">Date: {today}</div>
                  </div>
                </div>

                {/* Right Column - Certified Funds */}
                <div className="p-3">
                  <div className="text-xs font-bold mb-2">Certified</div>
                  <div className="text-[10px] mb-3">Funds Available</div>

                  <div className="mt-8">
                    <div className="border-t border-black pt-1 text-xs text-center font-bold">
                      HENRY M. SULLANO
                    </div>
                    <div className="text-[10px] text-center">Municipal Treasurer</div>
                    <div className="text-[10px] text-center mt-1">Date: {today}</div>
                  </div>
                </div>
              </div>

              {/* Approval and Receipt Section */}
              <div className="grid grid-cols-2 border-t border-black">
                {/* Approved for Payment */}
                <div className="border-r border-black p-3">
                  <div className="text-xs font-bold mb-3">C. Approved for payment</div>

                  <div className="mt-8">
                    <div className="border-t border-black pt-1 text-xs text-center font-bold">
                      ZACARINA A. LAZARO
                    </div>
                    <div className="text-[10px] text-center">Municipal Mayor</div>
                    <div className="text-[10px] text-center">Agency Head/Authorized Representative</div>
                    <div className="text-[10px] text-center mt-1">Date: {today}</div>
                  </div>
                </div>

                {/* Received Payment */}
                <div className="p-3">
                  <div className="text-xs font-bold mb-2">Received Payment</div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-[10px]">Check No. ___________</div>
                    <div className="text-[10px]">Bank Name ___________</div>
                  </div>

                  <div className="mt-6">
                    <div className="border-t border-black pt-1 mb-1">
                      <div className="text-[10px]">Signature over Printed Name</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-[10px]">OR/Other Documents _____</div>
                      <div className="text-[10px]">JEV No. _____</div>
                    </div>
                    <div className="text-[10px] mt-1">Date: {today}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium flex items-center gap-2 shadow-lg transition-all"
            >
              <Printer className="w-5 h-5" />
              Print Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
