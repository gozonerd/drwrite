export interface ExportSettings {
  fontSize: number;      // px
  marginTop: number;     // inches
  marginBottom: number;  // inches
  marginLeft: number;    // inches
  marginRight: number;   // inches
  fontFamily: string;
}

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  fontSize: 14,
  marginTop: 1.0,
  marginBottom: 1.0,
  marginLeft: 1.0,
  marginRight: 1.0,
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

/**
 * Generate a self-contained, print-optimized HTML document from
 * the TipTap WYSIWYG editor's rendered HTML content.
 */
export function generatePrintHtml(
  bodyHtml: string,
  settings: ExportSettings = DEFAULT_EXPORT_SETTINGS,
  title = 'DrWrite Export',
): string {
  const { fontSize, marginTop, marginBottom, marginLeft, marginRight, fontFamily } = settings;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page {
      margin: ${marginTop}in ${marginRight}in ${marginBottom}in ${marginLeft}in;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fff;
      margin: 0;
      padding: 0;
    }

    h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; font-weight: 700; margin: 0.83em 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2em; }
    h3 { font-size: 1.25em; font-weight: 600; margin: 1em 0; }
    h4 { font-size: 1.1em; font-weight: 600; margin: 1em 0; }
    h5 { font-size: 1em; font-weight: 600; margin: 1em 0; }
    h6 { font-size: 0.9em; font-weight: 600; margin: 1em 0; }

    p { margin: 0.5em 0; }
    ul { list-style: disc; padding-left: 1.5em; }
    ol { list-style: decimal; padding-left: 1.5em; }

    blockquote {
      border-left: 3px solid #6b7280;
      padding-left: 1em;
      margin: 0.5em 0;
      color: #6b7280;
    }

    code {
      background: #f3f4f6;
      border-radius: 3px;
      padding: 0.15em 0.3em;
      font-family: "Fira Code", "Cascadia Code", monospace;
      font-size: 0.9em;
    }

    pre {
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0.75em 1em;
      overflow-x: auto;
      font-size: 0.85em;
    }

    pre code {
      background: none;
      padding: 0;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 0.5em 0;
    }

    th, td {
      border: 1px solid #d1d5db;
      padding: 0.4em 0.6em;
      text-align: left;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
    }

    hr {
      border: none;
      border-top: 1px solid #d1d5db;
      margin: 1.5em 0;
    }

    a { color: #2563eb; text-decoration: underline; }
    strong { font-weight: 700; }
    em { font-style: italic; }

    img { max-width: 100%; height: auto; }
    svg { max-width: 100%; height: auto; }

    @media print {
      body { font-size: ${fontSize}px; }
      pre, code { page-break-inside: avoid; }
      h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
      table { page-break-inside: avoid; }
    }

    @page {
      @bottom-center {
        content: counter(page);
        font-size: 10px;
        color: #9ca3af;
      }
    }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
