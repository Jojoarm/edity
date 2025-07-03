import React from 'react';
import { useDownloadDocx } from '@/hooks/useDownloadDocx';

interface Props {
  markdown: string;
  fileName: string;
}

const DownloadPdfButton: React.FC<Props> = ({ markdown, fileName }) => {
  const { downloadDocx } = useDownloadDocx();

  const handleClick = () => {
    downloadDocx(markdown, fileName);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-700"
    >
      Save as Word
    </button>
  );
};

export default DownloadPdfButton;
