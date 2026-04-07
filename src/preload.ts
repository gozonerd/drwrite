import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('drwrite', {
  openFile: () => ipcRenderer.invoke('file:open'),
  saveFile: (args: { filePath: string; content: string }) => ipcRenderer.invoke('file:save', args),
  saveFileAs: (args: { content: string }) => ipcRenderer.invoke('file:saveAs', args),
  exportPdf: (args: { html: string }) => ipcRenderer.invoke('file:exportPdf', args),
  exportHtml: (args: { html: string }) => ipcRenderer.invoke('file:exportHtml', args),
  previewHtml: (args: { html: string }) => ipcRenderer.invoke('file:preview', args),
  getRecentFiles: () => ipcRenderer.invoke('recent:list'),
  openRecentFile: (args: { filePath: string }) => ipcRenderer.invoke('recent:open', args),
  clearRecentFiles: () => ipcRenderer.invoke('recent:clear'),
  getGitStatus: (args: { filePath: string }) => ipcRenderer.invoke('git:status', args),
  watchFile: (args: { filePath: string }) => ipcRenderer.invoke('watch:start', args),
  unwatchFile: () => ipcRenderer.invoke('watch:stop'),
  onFileChanged: (callback: (data: { filePath: string }) => void) => {
    const handler = (_event: unknown, data: { filePath: string }) => callback(data);
    ipcRenderer.on('watch:file-changed', handler);
    return () => {
      ipcRenderer.removeListener('watch:file-changed', handler);
    };
  },
  readDirectory: (args: { dirPath: string }) => ipcRenderer.invoke('fs:readdir', args),
});
