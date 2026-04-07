interface RecentFileEntry {
  filePath: string;
  lastOpened: string;
  openCount: number;
}

interface DrWriteAPI {
  openFile: () => Promise<{ canceled: boolean; filePath?: string; content?: string }>;
  saveFile: (args: {
    filePath: string;
    content: string;
  }) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  saveFileAs: (args: {
    content: string;
  }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
  exportPdf: (args: {
    html: string;
  }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
  exportHtml: (args: {
    html: string;
  }) => Promise<{ canceled: boolean; success?: boolean; filePath?: string; error?: string }>;
  previewHtml: (args: { html: string }) => Promise<{ success: boolean; error?: string }>;
  getRecentFiles: () => Promise<RecentFileEntry[]>;
  openRecentFile: (args: {
    filePath: string;
  }) => Promise<{ canceled: boolean; filePath?: string; content?: string; success?: boolean; error?: string }>;
  clearRecentFiles: () => Promise<{ success: boolean }>;
  getGitStatus: (args: { filePath: string }) => Promise<{
    isRepo: boolean;
    branch?: string;
    isFileDirty?: boolean;
    fileStatus?: string | null;
  }>;
  watchFile: (args: { filePath: string }) => Promise<{ success: boolean }>;
  unwatchFile: () => Promise<{ success: boolean }>;
  onFileChanged: (callback: (data: { filePath: string }) => void) => () => void;
  readDirectory: (args: { dirPath: string }) => Promise<{
    entries: { name: string; isDirectory: boolean; path: string }[];
    error?: string;
  }>;
}

declare global {
  interface Window {
    drwrite: DrWriteAPI;
  }
}

export {};
