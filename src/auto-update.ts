import { autoUpdater } from 'electron-updater';
import { BrowserWindow } from 'electron';

/**
 * Initialize auto-update checking.
 * Checks GitHub Releases for new versions on app launch.
 * Shows a notification when an update is available.
 * Downloads in background and installs on quit.
 */
export function initAutoUpdater(): void {
  // Don't check for updates in dev mode
  if (process.env.NODE_ENV === 'development' || !process.resourcesPath) {
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', (info) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send('update:available', {
        version: info.version,
        releaseDate: info.releaseDate,
      });
    }
  });

  autoUpdater.on('update-downloaded', (info) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send('update:downloaded', {
        version: info.version,
      });
    }
  });

  autoUpdater.on('error', (err) => {
    console.error('Auto-update error:', err);
  });

  // Check for updates (non-blocking)
  autoUpdater.checkForUpdatesAndNotify().catch((err) => {
    console.error('Update check failed:', err);
  });
}
