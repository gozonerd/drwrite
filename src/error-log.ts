import path from 'node:path';
import fs from 'node:fs';

// Error logging for the main process. Packaged apps have no visible console,
// so errors are appended to <userData>/error.log where they can be found after
// the fact. Kept free of Electron imports so it works even when native-module
// loading is broken and stays unit-testable in a plain Node environment.

export const ERROR_LOG_FILENAME = 'error.log';

export function formatErrorEntry(context: string, error: unknown, timestamp: Date = new Date()): string {
  const detail = error instanceof Error ? (error.stack ?? error.message) : String(error);
  return `[${timestamp.toISOString()}] ${context}: ${detail}\n`;
}

/**
 * Append an entry to error.log inside the given directory, creating the
 * directory if needed. Returns the log file path, or null if the write
 * failed — never throws, so error reporting can't cause a second failure.
 */
export function appendErrorLog(dir: string, context: string, error: unknown): string | null {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const logPath = path.join(dir, ERROR_LOG_FILENAME);
    fs.appendFileSync(logPath, formatErrorEntry(context, error), 'utf-8');
    return logPath;
  } catch {
    return null;
  }
}

/**
 * Returns a gate function that is true on its first call and false ever after.
 * Used to rate-limit the fatal-error dialog to once per session: under a
 * persistently broken database every window close throws again, and a modal
 * dialog per throw can block app quit (observed 2026-07-02 in e2e under a
 * wrong-ABI native module). Only the dialog is limited — the log file still
 * receives every entry.
 */
export function createOnceGate(): () => boolean {
  let used = false;
  return () => {
    if (used) return false;
    used = true;
    return true;
  };
}
