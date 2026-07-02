import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';

// Mock electron before importing the database module
vi.mock('electron', () => ({
  app: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPath: (_name: string) => os.tmpdir(),
  },
}));

// Dynamic import type — re-imported via resetModules each test
type DbModule = typeof import('./database');

let dbModule: DbModule;
let tmpDbPath: string;

beforeEach(async () => {
  // Reset modules so each test gets a fresh `let db = null` state
  vi.resetModules();
  dbModule = await import('./database');

  // Track the db file so we can clean it up
  tmpDbPath = path.join(os.tmpdir(), 'drwrite.db');
});

afterEach(() => {
  // Close the database connection if open
  try {
    dbModule.closeDatabase();
  } catch {
    // Already closed or never opened — safe to ignore
  }

  // Remove the temp database file and WAL/SHM sidecars
  for (const suffix of ['', '-wal', '-shm']) {
    try {
      fs.unlinkSync(tmpDbPath + suffix);
    } catch {
      // File may not exist
    }
  }
});

// --- Schema ---

describe('schema initialization', () => {
  it('creates tables on first connection', () => {
    const db = dbModule.getDatabase();

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all() as { name: string }[];

    const tableNames = tables.map((t) => t.name).sort();
    expect(tableNames).toEqual(['preferences', 'recent_files', 'window_state']);
  });
});

// --- Recent Files ---

describe('addRecentFile', () => {
  it('inserts a new entry', () => {
    dbModule.addRecentFile('/tmp/test.md');

    const files = dbModule.getRecentFiles();
    expect(files).toHaveLength(1);
    expect(files[0].filePath).toBe('/tmp/test.md');
    expect(files[0].openCount).toBe(1);
  });

  it('updates existing entry and increments open_count', () => {
    dbModule.addRecentFile('/tmp/test.md');
    dbModule.addRecentFile('/tmp/test.md');

    const files = dbModule.getRecentFiles();
    expect(files).toHaveLength(1);
    expect(files[0].openCount).toBe(2);
  });
});

describe('getRecentFiles', () => {
  it('returns files sorted by last_opened desc', () => {
    const db = dbModule.getDatabase();

    // Insert with explicit timestamps to control ordering
    db.prepare("INSERT INTO recent_files (file_path, last_opened) VALUES (?, datetime('now', '-2 minutes'))").run(
      '/tmp/old.md',
    );
    db.prepare("INSERT INTO recent_files (file_path, last_opened) VALUES (?, datetime('now', '-1 minutes'))").run(
      '/tmp/mid.md',
    );
    db.prepare("INSERT INTO recent_files (file_path, last_opened) VALUES (?, datetime('now'))").run('/tmp/new.md');

    const files = dbModule.getRecentFiles();
    expect(files.map((f) => f.filePath)).toEqual(['/tmp/new.md', '/tmp/mid.md', '/tmp/old.md']);
  });

  it('respects limit parameter', () => {
    dbModule.addRecentFile('/tmp/a.md');
    dbModule.addRecentFile('/tmp/b.md');
    dbModule.addRecentFile('/tmp/c.md');

    const files = dbModule.getRecentFiles(2);
    expect(files).toHaveLength(2);
  });
});

describe('clearRecentFiles', () => {
  it('removes all entries', () => {
    dbModule.addRecentFile('/tmp/a.md');
    dbModule.addRecentFile('/tmp/b.md');
    dbModule.clearRecentFiles();

    const files = dbModule.getRecentFiles();
    expect(files).toHaveLength(0);
  });
});

// --- Preferences ---

describe('getPreference', () => {
  it('returns undefined for missing key', () => {
    const value = dbModule.getPreference('nonexistent');
    expect(value).toBeUndefined();
  });

  it('returns default value when provided for missing key', () => {
    const value = dbModule.getPreference('nonexistent', 'fallback');
    expect(value).toBe('fallback');
  });
});

describe('setPreference', () => {
  it('stores and retrieves a value', () => {
    dbModule.setPreference('theme', 'dark');
    expect(dbModule.getPreference('theme')).toBe('dark');
  });

  it('updates existing value', () => {
    dbModule.setPreference('theme', 'dark');
    dbModule.setPreference('theme', 'light');
    expect(dbModule.getPreference('theme')).toBe('light');
  });
});

// --- Window State ---

describe('getWindowState', () => {
  it('returns defaults on first call', () => {
    const state = dbModule.getWindowState();
    expect(state).toEqual({
      x: undefined,
      y: undefined,
      width: 1200,
      height: 800,
      isMaximized: false,
    });
  });
});

describe('saveWindowState', () => {
  it('persists and retrieves values', () => {
    dbModule.saveWindowState({
      x: 100,
      y: 200,
      width: 1024,
      height: 768,
      isMaximized: true,
    });

    const state = dbModule.getWindowState();
    expect(state).toEqual({
      x: 100,
      y: 200,
      width: 1024,
      height: 768,
      isMaximized: true,
    });
  });
});

describe('getWindowStateSafe', () => {
  it('returns the stored state when the database is healthy', () => {
    dbModule.saveWindowState({
      x: 10,
      y: 20,
      width: 1024,
      height: 768,
      isMaximized: false,
    });

    expect(dbModule.getWindowStateSafe()).toEqual({
      x: 10,
      y: 20,
      width: 1024,
      height: 768,
      isMaximized: false,
    });
  });

  it('falls back to defaults when the native module fails to load', async () => {
    // Simulate the better-sqlite3 ABI mismatch that broke the packaged app for
    // ~3 months: the native addon loads lazily on first construction, so the
    // throw happens inside getWindowState(), not at import time.
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const errorLogPath = path.join(os.tmpdir(), 'error.log');

    try {
      vi.resetModules();
      vi.doMock('better-sqlite3', () => ({
        default: class {
          constructor() {
            throw new Error('was compiled against a different Node.js version (simulated ABI mismatch)');
          }
        },
      }));
      const broken = await import('./database');

      // The unsafe read still throws — the wrapper is doing real work
      expect(() => broken.getWindowState()).toThrow();

      expect(broken.getWindowStateSafe()).toEqual({
        width: 1200,
        height: 800,
        isMaximized: false,
      });

      // The fallback leaves a diagnosable trace in <userData>/error.log
      expect(fs.readFileSync(errorLogPath, 'utf-8')).toContain('Window state restore failed');
    } finally {
      vi.doUnmock('better-sqlite3');
      consoleSpy.mockRestore();
      try {
        fs.unlinkSync(errorLogPath);
      } catch {
        // File may not exist if an assertion failed before the fallback ran
      }
    }
  });
});

// --- Cleanup ---

describe('closeDatabase', () => {
  it('closes the connection without error', () => {
    // Ensure a connection is open first
    dbModule.getDatabase();

    // Should not throw
    expect(() => dbModule.closeDatabase()).not.toThrow();

    // Calling again should also be safe (idempotent)
    expect(() => dbModule.closeDatabase()).not.toThrow();
  });
});
