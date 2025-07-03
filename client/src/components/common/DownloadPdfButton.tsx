import React from 'react';
import { useDownloadPdf } from '@/hooks/useDownloadPdf';

interface Props {
  markdown: string;
  fileName: string;
}

const DownloadPdfButton: React.FC<Props> = ({ markdown, fileName }) => {
  const { downloadPdf } = useDownloadPdf();

  const handleClick = () => {
    downloadPdf(markdown, fileName);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
    >
      Export as PDF
    </button>
  );
};

export default DownloadPdfButton;
