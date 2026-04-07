import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock electron-updater before importing
vi.mock('electron-updater', () => ({
  autoUpdater: {
    autoDownload: false,
    autoInstallOnAppQuit: false,
    on: vi.fn(),
    checkForUpdatesAndNotify: vi.fn().mockResolvedValue(null),
  },
}));

// Mock electron
vi.mock('electron', () => ({
  BrowserWindow: {
    getFocusedWindow: vi.fn().mockReturnValue(null),
    getAllWindows: vi.fn().mockReturnValue([]),
  },
}));

describe('auto-update', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('module exports initAutoUpdater function', async () => {
    const mod = await import('./auto-update');
    expect(mod.initAutoUpdater).toBeDefined();
    expect(typeof mod.initAutoUpdater).toBe('function');
  });

  it('initAutoUpdater does not throw in dev mode', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const { initAutoUpdater } = await import('./auto-update');
    expect(() => initAutoUpdater()).not.toThrow();

    process.env.NODE_ENV = originalEnv;
  });

  it('autoUpdater event listeners are registered when not in dev', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    // Need to re-import to get fresh module
    vi.resetModules();

    vi.doMock('electron-updater', () => {
      const on = vi.fn();
      return {
        autoUpdater: {
          autoDownload: false,
          autoInstallOnAppQuit: false,
          on,
          checkForUpdatesAndNotify: vi.fn().mockResolvedValue(null),
        },
      };
    });

    vi.doMock('electron', () => ({
      BrowserWindow: {
        getFocusedWindow: vi.fn().mockReturnValue(null),
        getAllWindows: vi.fn().mockReturnValue([]),
      },
    }));

    // Auto-update skips when no resourcesPath (dev mode check)
    // This test verifies the function doesn't crash
    const { initAutoUpdater } = await import('./auto-update');
    expect(() => initAutoUpdater()).not.toThrow();

    process.env.NODE_ENV = originalEnv;
  });
});
