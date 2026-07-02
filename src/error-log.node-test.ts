import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { formatErrorEntry, appendErrorLog, createOnceGate, ERROR_LOG_FILENAME } from './error-log';

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'drwrite-errlog-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// --- formatErrorEntry ---

describe('formatErrorEntry', () => {
  it('includes ISO timestamp, context, and stack for Error values', () => {
    const error = new Error('boom');
    const timestamp = new Date('2026-07-02T12:00:00.000Z');

    const entry = formatErrorEntry('Uncaught Exception', error, timestamp);

    expect(entry).toContain('[2026-07-02T12:00:00.000Z]');
    expect(entry).toContain('Uncaught Exception: ');
    expect(entry).toContain('Error: boom');
    expect(entry.endsWith('\n')).toBe(true);
  });

  it('falls back to message when the Error has no stack', () => {
    const error = new Error('no stack here');
    error.stack = undefined;

    const entry = formatErrorEntry('Ctx', error);

    expect(entry).toContain('Ctx: no stack here');
  });

  it('stringifies non-Error values', () => {
    const entry = formatErrorEntry('Ctx', 'plain string failure');

    expect(entry).toContain('Ctx: plain string failure');
  });
});

// --- appendErrorLog ---

describe('appendErrorLog', () => {
  it('creates the directory if needed and returns the log path', () => {
    const dir = path.join(tmpDir, 'nested', 'logs');

    const logPath = appendErrorLog(dir, 'Ctx', new Error('boom'));

    expect(logPath).toBe(path.join(dir, ERROR_LOG_FILENAME));
    expect(fs.readFileSync(logPath as string, 'utf-8')).toContain('Ctx: ');
  });

  it('appends across calls instead of overwriting', () => {
    appendErrorLog(tmpDir, 'First', new Error('one'));
    const logPath = appendErrorLog(tmpDir, 'Second', new Error('two'));

    const content = fs.readFileSync(logPath as string, 'utf-8');
    expect(content).toContain('First: ');
    expect(content).toContain('Second: ');
  });

  it('returns null instead of throwing when the directory cannot be created', () => {
    // A path nested under an existing FILE can never become a directory
    const blockingFile = path.join(tmpDir, 'not-a-dir');
    fs.writeFileSync(blockingFile, 'occupied', 'utf-8');

    let logPath: string | null = 'unset' as string | null;
    expect(() => {
      logPath = appendErrorLog(path.join(blockingFile, 'sub'), 'Ctx', new Error('boom'));
    }).not.toThrow();
    expect(logPath).toBeNull();
  });
});

// --- createOnceGate ---

describe('createOnceGate', () => {
  it('is true on the first call and false ever after', () => {
    const gate = createOnceGate();

    expect(gate()).toBe(true);
    expect(gate()).toBe(false);
    expect(gate()).toBe(false);
  });

  it('keeps independent gates independent', () => {
    const first = createOnceGate();
    const second = createOnceGate();

    expect(first()).toBe(true);
    expect(second()).toBe(true);
  });
});
