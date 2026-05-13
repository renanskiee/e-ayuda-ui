// QR Code generator utility for beneficiary verification
import QRCode from 'qrcode';

export interface BeneficiaryQRData {
  applicationId: string;
  beneficiaryName: string;
  referenceNumber: string;
  amount: number;
  sector: string;
  dateApproved: string;
}

/**
 * Generate QR code as Data URL (image)
 * @param data - Beneficiary information
 * @returns Promise with Data URL string (can be used in img src)
 */
export const generateQRCodeImage = async (data: BeneficiaryQRData): Promise<string> => {
  try {
    // Create JSON string with beneficiary info
    const qrData = JSON.stringify({
      id: data.applicationId,
      ref: data.referenceNumber,
      name: data.beneficiaryName,
      amount: data.amount,
      sector: data.sector,
      approved: data.dateApproved,
      timestamp: new Date().toISOString()
    });

    // Generate QR code as Data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H', // High error correction
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Generate QR code reference string (for storage)
 * @param applicationId - Application ID
 * @returns QR reference string
 */
export const generateQRReference = (applicationId: string): string => {
  return `QR-${applicationId}`;
};

/**
 * Generate unique reference number
 * @param applicationId - Application ID
 * @returns Reference number string
 */
export const generateReferenceNumber = (applicationId: string): string => {
  const year = new Date().getFullYear();
  const idParts = applicationId.split('-');
  const number = idParts[idParts.length - 1];
  return `REF-${year}-${number}`;
};

/**
 * Decode QR code data from scanned string
 * @param qrString - Scanned QR code string
 * @returns Parsed beneficiary data or null if invalid
 */
export const decodeQRData = (qrString: string): BeneficiaryQRData | null => {
  try {
    const parsed = JSON.parse(qrString);

    // Validate required fields
    if (!parsed.id || !parsed.ref || !parsed.name || !parsed.amount) {
      return null;
    }

    return {
      applicationId: parsed.id,
      referenceNumber: parsed.ref,
      beneficiaryName: parsed.name,
      amount: parsed.amount,
      sector: parsed.sector || 'Unknown',
      dateApproved: parsed.approved || 'Unknown'
    };
  } catch (error) {
    console.error('Error decoding QR data:', error);
    return null;
  }
};

/**
 * Download QR code as PNG file
 * @param qrCodeDataURL - QR code Data URL
 * @param filename - File name for download
 */
export const downloadQRCode = (qrCodeDataURL: string, filename: string) => {
  const link = document.createElement('a');
  link.href = qrCodeDataURL;
  link.download = `${filename}.png`;
  link.click();
};
