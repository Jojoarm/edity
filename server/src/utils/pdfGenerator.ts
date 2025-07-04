import puppeteer from 'puppeteer';

export const generatePdfFromHtml = async (
  htmlContent: string,
  safeFilename: string
): Promise<Buffer> => {
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${safeFilename}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            line-height: 1.6;
            color: #222;
            font-size: 14px;
          }
           h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin-top: 1.5rem !important;
                margin-bottom: 0.5rem !important;
                font-weight: 700 !important;
            }
   
            h1:first-child,
            h2:first-child,
            h3:first-child,
            h4:first-child,
            h5:first-child,
            h6:first-child {
                margin-top: 0 !important;
            }
        h1 {
            font-size: 1.8rem !important;
            font-weight: 800 !important;
            color: #1f2937 !important; /* Dark gray */
            text-align: center !important
            
        }

        h2 {
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            color: #374151 !important; /* Medium gray */
        }

        h3 {
            font-size: 1.3rem !important;
            font-weight: 600 !important;
            color: #4b5563 !important; /* Lighter gray */
        }

        h4 {
            font-size: 1.125rem !important;
            font-weight: 600 !important;
            color: #6b7280 !important;
        }

        h5 {
            font-size: 1.105rem !important;
            font-weight: 500 !important;
            color: #6b7280 !important;
        }

        h6 {
            font-size: 1rem !important;
            font-weight: 500 !important;
            color: #9ca3af !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
        }

          ul, ol {
            margin: 12px 0 12px 24px;
          }
          li {
            margin-bottom: 6px;
          }
          p {
            margin: 10px 0;
          }
          strong {
            font-weight: bold;
          }
          .page-break {
            page-break-before: always;
          }
          /* Add styles for code blocks and inline code */
          pre {
            background-color: #f4f4f4;
            padding: 12px;
            border-radius: 4px;
            overflow-x: auto;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }
          /* Add styles for tables */
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          /* Add styles for blockquotes */
          blockquote {
            border-left: 4px solid #ccc;
            margin-left: 0;
            padding-left: 16px;
            color: #666;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
    displayHeaderFooter: false, // This fixes the "about:blank" issue
    preferCSSPageSize: false,
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};
