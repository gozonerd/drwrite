interface DrWriteAPI {
  openFile: () => Promise<{ canceled: boolean; filePath?: string; content?: string }>;
  saveFile: (args: { filePath: string; content: string }) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  saveFileAs: (args: { content: string }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
  exportPdf: (args: { html: string }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
  exportHtml: (args: { html: string }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
}

declare global {
  interface Window {
    drwrite: DrWriteAPI;
  }
}

export {};
