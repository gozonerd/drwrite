import { describe, it, expect } from 'vitest';
import { generatePrintHtml, DEFAULT_EXPORT_SETTINGS } from './export-html';

describe('generatePrintHtml', () => {
  it('wraps body HTML in a complete HTML document', () => {
    const html = generatePrintHtml('<p>Hello</p>');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html');
    expect(html).toContain('<head>');
    expect(html).toContain('<body>');
    expect(html).toContain('<p>Hello</p>');
    expect(html).toContain('</body>');
    expect(html).toContain('</html>');
  });

  it('applies font size from settings', () => {
    const html = generatePrintHtml('<p>Test</p>', { ...DEFAULT_EXPORT_SETTINGS, fontSize: 18 });
    expect(html).toContain('font-size: 18px');
  });

  it('applies margins from settings', () => {
    const settings = { ...DEFAULT_EXPORT_SETTINGS, marginTop: 1.5, marginRight: 2 };
    const html = generatePrintHtml('<p>Test</p>', settings);
    expect(html).toContain('margin: 1.5in 2in');
  });

  it('applies font family from settings', () => {
    const settings = { ...DEFAULT_EXPORT_SETTINGS, fontFamily: '"Georgia", serif' };
    const html = generatePrintHtml('<p>Test</p>', settings);
    expect(html).toContain('font-family: "Georgia", serif');
  });

  it('sets the document title', () => {
    const html = generatePrintHtml('<p>Test</p>', DEFAULT_EXPORT_SETTINGS, 'My Document');
    expect(html).toContain('<title>My Document</title>');
  });

  it('escapes HTML in title', () => {
    const html = generatePrintHtml('<p>Test</p>', DEFAULT_EXPORT_SETTINGS, '<script>alert("xss")</script>');
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
  });

  it('includes print-specific CSS', () => {
    const html = generatePrintHtml('<p>Test</p>');
    expect(html).toContain('@media print');
    expect(html).toContain('page-break-inside: avoid');
  });

  it('includes page number CSS', () => {
    const html = generatePrintHtml('<p>Test</p>');
    expect(html).toContain('@bottom-center');
    expect(html).toContain('counter(page)');
  });

  it('includes table styling', () => {
    const html = generatePrintHtml('<table><tr><td>cell</td></tr></table>');
    expect(html).toContain('border-collapse: collapse');
  });

  it('uses default settings when none provided', () => {
    const html = generatePrintHtml('<p>Test</p>');
    expect(html).toContain(`font-size: ${DEFAULT_EXPORT_SETTINGS.fontSize}px`);
  });
});

describe('DEFAULT_EXPORT_SETTINGS', () => {
  it('has sensible defaults', () => {
    expect(DEFAULT_EXPORT_SETTINGS.fontSize).toBe(14);
    expect(DEFAULT_EXPORT_SETTINGS.marginTop).toBe(1.0);
    expect(DEFAULT_EXPORT_SETTINGS.marginBottom).toBe(1.0);
    expect(DEFAULT_EXPORT_SETTINGS.marginLeft).toBe(1.0);
    expect(DEFAULT_EXPORT_SETTINGS.marginRight).toBe(1.0);
    expect(DEFAULT_EXPORT_SETTINGS.fontFamily).toContain('sans-serif');
  });
});
