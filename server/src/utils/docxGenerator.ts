import htmlToDocx from 'html-to-docx';
import { createError } from '../middlewares/errorHandler';

export const generateDocxFromHtml = async (
  htmlContent: string
): Promise<Buffer> => {
  const result = await htmlToDocx(htmlContent, null, {
    orientation: 'portrait',
    margins: { top: 720, right: 720, bottom: 720, left: 720 },
  });

  // Check if result is already a Buffer-friendly object
  if (result instanceof ArrayBuffer) {
    return Buffer.from(result);
  }

  // Convert Blob to Buffer if necessary
  if (result instanceof Blob) {
    const arrayBuffer = await result.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  throw createError('Unexpected result type from html-to-docx');
};
