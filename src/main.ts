import { app, BrowserWindow, dialog, ipcMain, nativeImage } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { simpleGit } from 'simple-git';
import chokidar from 'chokidar';
import { getWindowState, saveWindowState, addRecentFile, getRecentFiles, clearRecentFiles, closeDatabase } from './db/database';

// electron-squirrel-startup can cause immediate exit on Windows dev
// Only use in production/installed context
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const started = require('electron-squirrel-startup');
  if (started) {
    app.quit();
  }
} catch {
  // Module may not be available — safe to ignore in dev
}

// Catch unhandled errors to prevent silent crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

const createWindow = () => {
  // Restore saved window position/size
  const windowState = getWindowState();

  // Load app icon for taskbar and title bar
  const iconPath = path.join(__dirname, '..', '..', 'assets', 'icons', 'icon.png');
  const appIcon = fs.existsSync(iconPath) ? nativeImage.createFromPath(iconPath) : undefined;

  const mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (windowState.isMaximized) {
    mainWindow.maximize();
  }

  // Save window state on close
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    saveWindowState({
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      isMaximized: mainWindow.isMaximized(),
    });
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Uncomment to open DevTools for debugging:
  // mainWindow.webContents.openDevTools({ mode: 'right' });
};

// --- IPC Handlers for File Operations ---

ipcMain.handle('file:open', async () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { canceled: true };

  const result = await dialog.showOpenDialog(win, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown', 'mdx', 'txt'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  const filePath = result.filePaths[0];
  const content = fs.readFileSync(filePath, 'utf-8');
  addRecentFile(filePath);
  return { canceled: false, filePath, content };
});

ipcMain.handle('file:save', async (_event, { filePath, content }: { filePath: string; content: string }) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true, filePath };
  } catch (err) {
    return { success: false, error: String(err) };
  }
});

ipcMain.handle('file:saveAs', async (_event, { content }: { content: string }) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { canceled: true };

  const result = await dialog.showSaveDialog(win, {
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }

  try {
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return { canceled: false, success: true, filePath: result.filePath };
  } catch (err) {
    return { canceled: false, success: false, error: String(err) };
  }
});

ipcMain.handle('file:exportPdf', async (_event, { html }: { html: string }) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { canceled: true };

  const result = await dialog.showSaveDialog(win, {
    filters: [{ name: 'PDF', extensions: ['pdf'] }],
  });

  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }

  try {
    // Create a hidden window to render the HTML for printing
    const printWin = new BrowserWindow({
      show: false,
      width: 800,
      height: 600,
      webPreferences: { offscreen: true },
    });

    const tmpFile = path.join(os.tmpdir(), `drwrite-export-${Date.now()}.html`);
    fs.writeFileSync(tmpFile, html, 'utf-8');
    await printWin.loadFile(tmpFile);

    const pdfBuffer = await printWin.webContents.printToPDF({
      printBackground: true,
      preferCSSPageSize: true,
      margins: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 },
    });

    fs.writeFileSync(result.filePath, pdfBuffer);
    fs.unlinkSync(tmpFile);
    printWin.destroy();

    return { canceled: false, success: true, filePath: result.filePath };
  } catch (err) {
    return { canceled: false, success: false, error: String(err) };
  }
});

ipcMain.handle('file:exportHtml', async (_event, { html }: { html: string }) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return { canceled: true };

  const result = await dialog.showSaveDialog(win, {
    filters: [{ name: 'HTML', extensions: ['html'] }],
  });

  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }

  try {
    fs.writeFileSync(result.filePath, html, 'utf-8');
    return { canceled: false, success: true, filePath: result.filePath };
  } catch (err) {
    return { canceled: false, success: false, error: String(err) };
  }
});

ipcMain.handle('file:preview', async (_event, { html }: { html: string }) => {
  try {
    const previewWin = new BrowserWindow({
      width: 800,
      height: 900,
      title: 'Print Preview — DrWrite',
      webPreferences: { contextIsolation: true },
    });

    const tmpFile = path.join(os.tmpdir(), `drwrite-preview-${Date.now()}.html`);
    fs.writeFileSync(tmpFile, html, 'utf-8');
    await previewWin.loadFile(tmpFile);

    // Clean up temp file when window closes
    previewWin.on('closed', () => {
      try { fs.unlinkSync(tmpFile); } catch { /* already deleted */ }
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
});

// --- IPC Handlers for Recent Files ---

ipcMain.handle('recent:list', async () => {
  return getRecentFiles(10);
});

ipcMain.handle('recent:open', async (_event, { filePath }: { filePath: string }) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    addRecentFile(filePath);
    return { canceled: false, filePath, content };
  } catch (err) {
    return { canceled: false, success: false, error: String(err) };
  }
});

ipcMain.handle('recent:clear', async () => {
  clearRecentFiles();
  return { success: true };
});

// --- File Watcher ---

let fileWatcher: chokidar.FSWatcher | null = null;

ipcMain.handle('watch:start', async (_event, { filePath }: { filePath: string }) => {
  // Stop any existing watcher
  if (fileWatcher) {
    await fileWatcher.close();
    fileWatcher = null;
  }

  // eslint-disable-next-line import/no-named-as-default-member
  fileWatcher = chokidar.watch(filePath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
  });

  fileWatcher.on('change', () => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send('watch:file-changed', { filePath });
    }
  });

  return { success: true };
});

ipcMain.handle('watch:stop', async () => {
  if (fileWatcher) {
    await fileWatcher.close();
    fileWatcher = null;
  }
  return { success: true };
});

// --- IPC Handlers for Git Status ---

ipcMain.handle('git:status', async (_event, { filePath }: { filePath: string }) => {
  try {
    const dir = path.dirname(filePath);
    const git = simpleGit(dir);
    const isRepo = await git.checkIsRepo();
    if (!isRepo) return { isRepo: false };

    const [branch, status] = await Promise.all([
      git.branchLocal(),
      git.status(),
    ]);

    const fileName = path.basename(filePath);
    const fileStatus = status.files.find((f) => f.path === fileName || filePath.endsWith(f.path));

    return {
      isRepo: true,
      branch: branch.current,
      isFileDirty: !!fileStatus,
      fileStatus: fileStatus?.working_dir || fileStatus?.index || null,
    };
  } catch {
    return { isRepo: false };
  }
});

// --- App Lifecycle ---

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  closeDatabase();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
