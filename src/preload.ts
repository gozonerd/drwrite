import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('drwrite', {
  openFile: () => ipcRenderer.invoke('file:open'),
  saveFile: (args: { filePath: string; content: string }) =>
    ipcRenderer.invoke('file:save', args),
  saveFileAs: (args: { content: string }) =>
    ipcRenderer.invoke('file:saveAs', args),
  exportPdf: (args: { html: string }) =>
    ipcRenderer.invoke('file:exportPdf', args),
  exportHtml: (args: { html: string }) =>
    ipcRenderer.invoke('file:exportHtml', args),
  getRecentFiles: () => ipcRenderer.invoke('recent:list'),
  openRecentFile: (args: { filePath: string }) =>
    ipcRenderer.invoke('recent:open', args),
  clearRecentFiles: () => ipcRenderer.invoke('recent:clear'),
  getGitStatus: (args: { filePath: string }) =>
    ipcRenderer.invoke('git:status', args),
});
