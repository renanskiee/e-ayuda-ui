import * as XLSX from 'xlsx';

export interface ExportOptions {
  filename: string;
  sheetName?: string;
}

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
): void {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Auto-size columns based on content
    const columnWidths: { wch: number }[] = [];
    if (data.length > 0) {
      const firstRow = data[0];
      Object.keys(firstRow).forEach((key, index) => {
        // Calculate max width for each column
        const headerLength = key.length;
        const maxDataLength = Math.max(
          ...data.map(row => String(row[key] || '').length)
        );
        columnWidths[index] = {
          wch: Math.max(headerLength, maxDataLength, 10)
        };
      });
      worksheet['!cols'] = columnWidths;
    }

    // Add worksheet to workbook
    const sheetName = options.sheetName || 'Sheet1';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate filename with timestamp if not already included
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = options.filename.includes('.xlsx')
      ? options.filename
      : `${options.filename}_${timestamp}.xlsx`;

    // Write the file
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Failed to export data to Excel');
  }
}

// Helper function to export table data with custom headers
export function exportTableToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columnMapping?: Record<keyof T, string>
): void {
  // If column mapping is provided, transform the data to use custom headers
  const transformedData = columnMapping
    ? data.map(row => {
        const newRow: Record<string, any> = {};
        Object.entries(columnMapping).forEach(([key, label]) => {
          newRow[label] = row[key];
        });
        return newRow;
      })
    : data;

  exportToExcel(transformedData, { filename });
}
