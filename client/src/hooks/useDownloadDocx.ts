import api from '@/lib/axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const useDownloadDocx = () => {
  const downloadDocx = async (
    markdown: string,
    filename: string = 'edity.docx'
  ) => {
    try {
      const rawHtml = await marked.parse(markdown);
      const htmlContent = DOMPurify.sanitize(rawHtml);
      const response = await api.post(
        '/api/users/export-docx',
        { htmlContent, filename },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('❌ Failed to download DOCX:', err);
      alert('Failed to download DOCX');
    }
  };

  return { downloadDocx };
};
