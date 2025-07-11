import { Download } from 'lucide-react';

type ExportCsvProps<T> = {
  data: T[];
  headers: string[];
  filename?: string;
  getRowData: (item: T) => (string | number | undefined | null)[];
};

const ExportToCSV = <T,>({
  data,
  headers,
  filename = 'export.csv',
  getRowData,
}: ExportCsvProps<T>) => {
  const exportData = () => {
    if (!data || data.length === 0) return;

    const csvContent = [headers, ...data.map(getRowData)]
      .map((row) =>
        row
          .map((cell) => {
            const value = cell ?? '';
            const escaped = `"${String(value).replace(/"/g, '""')}"`;
            return escaped;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportData}
      className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
    >
      <Download className="w-4 h-4 mr-1" />
      Export
    </button>
  );
};

export default ExportToCSV;
