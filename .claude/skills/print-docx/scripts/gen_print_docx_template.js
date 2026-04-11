/**
 * Stahl Systems Print-Optimized DOCX Template
 *
 * Usage: Copy this file, modify the CONFIG and SECTIONS, then run:
 *   npm install docx && node <your-copy>.js
 *
 * All Stahl Systems formatting is baked in. Do not modify the STYLES,
 * NUMBERING, or helper functions unless the print spec changes.
 */

const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
        BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
        TableOfContents } = require("docx");

// ============================================================
// CONFIG — Edit this for each document
// ============================================================
const CONFIG = {
  outputPath: "output_PRINT.docx",  // Change this
  title: "Document Title",           // Change this
  subtitle: "",                      // Optional
  version: "v01",                    // Change this
  date: "2026-03-22",               // Change this
  authors: "Author Name",           // Change this
  organization: "Stahl Systems",    // Usually keep as-is
  audience: "",                     // Optional
  basisText: "",                    // Optional — the "Basis:" line on title page
};

// ============================================================
// STAHL SYSTEMS PRINT SPEC — Do not modify
// ============================================================
const FONT = "Lato";
const STYLES = {
  default: { document: { run: { font: FONT, size: 24 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 32, bold: true, font: FONT },
      paragraph: { spacing: { before: 360, after: 240, line: 360 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, font: FONT },
      paragraph: { spacing: { before: 280, after: 180, line: 360 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 26, bold: true, font: FONT },
      paragraph: { spacing: { before: 240, after: 120, line: 360 }, outlineLevel: 2 } },
  ]
};

const NUMBERING = {
  config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ]
};

const PAGE = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
};

const TABLE_BORDER = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const BORDERS = { top: TABLE_BORDER, bottom: TABLE_BORDER, left: TABLE_BORDER, right: TABLE_BORDER };
const CELL_MARGINS = { top: 60, bottom: 60, left: 120, right: 120 };

// ============================================================
// HELPER FUNCTIONS — Do not modify
// ============================================================
const b = (t, sz) => new TextRun({ text: t, bold: true, font: FONT, size: sz || 24 });
const r = (t, sz) => new TextRun({ text: t, font: FONT, size: sz || 24 });
const it = (t, sz) => new TextRun({ text: t, italics: true, font: FONT, size: sz || 24 });

const p = (children, opts) => new Paragraph({
  spacing: { after: 120, line: 360 },
  ...opts,
  children: Array.isArray(children) ? children : [children]
});

const bullet = (children) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 80, line: 360 },
  children: Array.isArray(children) ? children : [children]
});

const num = (children) => new Paragraph({
  numbering: { reference: "numbers", level: 0 },
  spacing: { after: 80, line: 360 },
  children: Array.isArray(children) ? children : [children]
});

const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [r(text, 32)] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [r(text, 28)] });
const h3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [r(text, 26)] });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const makeTable = (headers, rows, colWidths) => {
  const totalWidth = colWidths.reduce((a, c) => a + c, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        children: headers.map((h, j) => new TableCell({
          borders: BORDERS, width: { size: colWidths[j], type: WidthType.DXA },
          shading: { fill: "2E4057", type: ShadingType.CLEAR },
          margins: CELL_MARGINS,
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: FONT, color: "FFFFFF" })] })]
        }))
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, j) => new TableCell({
          borders: BORDERS, width: { size: colWidths[j], type: WidthType.DXA },
          margins: CELL_MARGINS,
          children: [new Paragraph({ spacing: { line: 360 }, children: [new TextRun({ text: cell, size: 20, font: FONT })] })]
        }))
      }))
    ]
  });
};

const makeHeader = (title) => new Header({ children: [new Paragraph({
  alignment: AlignmentType.RIGHT,
  children: [new TextRun({ text: `Stahl Systems \u2014 ${title}`, font: FONT, size: 18, color: "888888", italics: true })]
})] });

const makeFooter = () => new Footer({ children: [new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [
    new TextRun({ text: "Page ", font: FONT, size: 18, color: "888888" }),
    new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: "888888" }),
  ]
})] });

// ============================================================
// TITLE PAGE — Uses CONFIG values
// ============================================================
const titlePage = {
  properties: { page: { ...PAGE, margin: { ...PAGE.margin, top: 2880 } } },
  children: [
    new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: CONFIG.title, font: FONT, size: 48, bold: true })
    ]}),
    ...(CONFIG.subtitle ? [p([new TextRun({ text: CONFIG.subtitle, font: FONT, size: 32, italics: true, color: "555555" })],
      { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 120, line: 360 } })] : []),
    p([r(`${CONFIG.version} | ${CONFIG.date}`)], { alignment: AlignmentType.CENTER, spacing: { before: 400, after: 80, line: 360 } }),
    p([r(CONFIG.authors)], { alignment: AlignmentType.CENTER, spacing: { after: 80, line: 360 } }),
    p([r(CONFIG.organization)], { alignment: AlignmentType.CENTER, spacing: { after: 200, line: 360 } }),
    ...(CONFIG.audience ? [p([r(`For: ${CONFIG.audience}`)], { alignment: AlignmentType.CENTER, spacing: { before: 400, after: 120, line: 360 } })] : []),
    ...(CONFIG.basisText ? [p([new TextRun({ text: CONFIG.basisText, font: FONT, size: 18, italics: true, color: "777777" })],
      { alignment: AlignmentType.CENTER, spacing: { before: 600, after: 120, line: 360 } })] : []),
  ]
};

// ============================================================
// SECTIONS — Edit this for each document
// ============================================================
// Replace the contents of this array with your document's content.
// Use the helper functions: h1(), h2(), h3(), p(), bullet(), num(),
// b(), r(), it(), pageBreak(), makeTable()
const SECTIONS = [
  h1("Table of contents"),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
  pageBreak(),

  // --- Your content goes here ---
  h1("1. Example section"),
  p([r("Replace this with your actual content.")]),

  // --- Closing ---
  new Paragraph({ spacing: { before: 600 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } }, children: [] }),
  p([it("Generated by Stahl Systems, " + CONFIG.date, 18)], { alignment: AlignmentType.CENTER }),
];

// ============================================================
// BUILD — Do not modify
// ============================================================
const doc = new Document({
  styles: STYLES,
  numbering: NUMBERING,
  sections: [
    titlePage,
    {
      properties: { page: PAGE },
      headers: { default: makeHeader(CONFIG.title) },
      footers: { default: makeFooter() },
      children: SECTIONS,
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(CONFIG.outputPath, buffer);
  console.log(`DOCX created: ${CONFIG.outputPath}`);
});
