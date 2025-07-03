import api from '@/lib/axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

export const useDownloadPdf = () => {
  const downloadPdf = async (
    markdown: string,
    filename: string = 'lesson.pdf'
  ) => {
    try {
      const rawHtml = await marked.parse(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);

      const response = await api.post(
        '/api/users/export-pdf',
        { htmlContent: cleanHtml, filename },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;

      // Required to make click work in all browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('❌ PDF download failed:', error);
      toast.error('Download failed');
    }
  };

  return { downloadPdf };
};
