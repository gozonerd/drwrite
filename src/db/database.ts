import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';
import { appendErrorLog } from '../error-log';

let db: Database.Database | null = null;

function getDbPath(): string {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'drwrite.db');
}

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(getDbPath());
    db.pragma('journal_mode = WAL');
    initSchema(db);
  }
  return db;
}

function initSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS recent_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT NOT NULL UNIQUE,
      last_opened TEXT NOT NULL DEFAULT (datetime('now')),
      open_count INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS preferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS window_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      x INTEGER,
      y INTEGER,
      width INTEGER NOT NULL DEFAULT 1200,
      height INTEGER NOT NULL DEFAULT 800,
      is_maximized INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Ensure window_state has exactly one row
  const row = database.prepare('SELECT COUNT(*) as count FROM window_state').get() as { count: number };
  if (row.count === 0) {
    database.prepare('INSERT INTO window_state (id, width, height) VALUES (1, 1200, 800)').run();
  }
}

// --- Recent Files ---

export interface RecentFile {
  filePath: string;
  lastOpened: string;
  openCount: number;
}

export function addRecentFile(filePath: string): void {
  const database = getDatabase();
  database
    .prepare(
      `
    INSERT INTO recent_files (file_path, last_opened, open_count)
    VALUES (?, datetime('now'), 1)
    ON CONFLICT(file_path) DO UPDATE SET
      last_opened = datetime('now'),
      open_count = open_count + 1
  `,
    )
    .run(filePath);
}

export function getRecentFiles(limit = 10): RecentFile[] {
  const database = getDatabase();
  const rows = database
    .prepare(
      `
    SELECT file_path as filePath, last_opened as lastOpened, open_count as openCount
    FROM recent_files
    ORDER BY last_opened DESC
    LIMIT ?
  `,
    )
    .all(limit) as RecentFile[];
  return rows;
}

export function clearRecentFiles(): void {
  const database = getDatabase();
  database.prepare('DELETE FROM recent_files').run();
}

// --- Preferences ---

export function getPreference(key: string, defaultValue?: string): string | undefined {
  const database = getDatabase();
  const row = database.prepare('SELECT value FROM preferences WHERE key = ?').get(key) as { value: string } | undefined;
  return row?.value ?? defaultValue;
}

export function setPreference(key: string, value: string): void {
  const database = getDatabase();
  database
    .prepare(
      `
    INSERT INTO preferences (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = ?
  `,
    )
    .run(key, value, value);
}

// --- Window State ---

export interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
  isMaximized: boolean;
}

export function getWindowState(): WindowState {
  const database = getDatabase();
  const row = database.prepare('SELECT x, y, width, height, is_maximized FROM window_state WHERE id = 1').get() as {
    x: number | null;
    y: number | null;
    width: number;
    height: number;
    is_maximized: number;
  };
  return {
    x: row.x ?? undefined,
    y: row.y ?? undefined,
    width: row.width,
    height: row.height,
    isMaximized: row.is_maximized === 1,
  };
}

/**
 * Like getWindowState(), but a database failure can never propagate: better-sqlite3
 * lazy-loads its native addon on first construction, so an ABI mismatch throws HERE
 * rather than at import time (the 2026-07-02 no-window incident). Falls back to the
 * schema defaults and leaves a trace in <userData>/error.log.
 */
export function getWindowStateSafe(): WindowState {
  try {
    return getWindowState();
  } catch (err) {
    console.error('Failed to read window state from database; using defaults:', err);
    try {
      appendErrorLog(app.getPath('userData'), 'Window state restore failed; using defaults', err);
    } catch {
      // Logging must never block the fallback
    }
    return { width: 1200, height: 800, isMaximized: false };
  }
}

export function saveWindowState(state: WindowState): void {
  const database = getDatabase();
  database
    .prepare(
      `
    UPDATE window_state SET x = ?, y = ?, width = ?, height = ?, is_maximized = ? WHERE id = 1
  `,
    )
    .run(state.x ?? null, state.y ?? null, state.width, state.height, state.isMaximized ? 1 : 0);
}

// --- Cleanup ---

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
