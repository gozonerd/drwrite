import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

// electron-squirrel-startup can cause immediate exit on Windows dev
// Only use in production/installed context
try {
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
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Show window only after content is painted — prevents blank screen
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // In dev mode, reload once after DOM is ready to work around Vite race condition
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    let hasReloaded = false;
    mainWindow.webContents.on('dom-ready', () => {
      if (!hasReloaded) {
        hasReloaded = true;
        setTimeout(() => {
          mainWindow.webContents.reload();
        }, 500);
      }
    });
  }

  // Retry load if Vite dev server isn't ready yet
  mainWindow.webContents.on('did-fail-load', (_event, _code, _desc, url) => {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL && url.startsWith(MAIN_WINDOW_VITE_DEV_SERVER_URL)) {
      setTimeout(() => {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      }, 1000);
    }
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

// --- App Lifecycle ---

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
