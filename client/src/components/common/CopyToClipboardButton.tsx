import { useState } from 'react';

interface Props {
  markdown: string;
}

const CopyToClipboardButton: React.FC<Props> = ({ markdown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy Markdown'}
    </button>
  );
};

export default CopyToClipboardButton;
