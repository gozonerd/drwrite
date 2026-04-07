import { describe, it, expect, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readFileContent, writeFileContent } from './file-ops';

// Helper to create a unique temp file path
function tmpFile(name: string): string {
  return path.join(os.tmpdir(), `drwrite-test-${Date.now()}-${name}`);
}

// Track files for cleanup
const createdFiles: string[] = [];

afterEach(() => {
  for (const f of createdFiles) {
    try {
      fs.unlinkSync(f);
    } catch {
      // Already gone
    }
  }
  createdFiles.length = 0;
});

describe('readFileContent', () => {
  it('reads content from an existing file', () => {
    const filePath = tmpFile('read-test.md');
    fs.writeFileSync(filePath, 'Hello, DrWrite!', 'utf-8');
    createdFiles.push(filePath);

    const result = readFileContent(filePath);
    expect(result).toEqual({ content: 'Hello, DrWrite!' });
  });

  it('returns error for nonexistent path', () => {
    const result = readFileContent('/nonexistent/path/to/file.md');
    expect(result).toHaveProperty('error');
    expect((result as { error: string }).error).toContain('ENOENT');
  });
});

describe('writeFileContent', () => {
  it('creates a file with the given content', () => {
    const filePath = tmpFile('write-test.md');
    createdFiles.push(filePath);

    const result = writeFileContent(filePath, '# Test Content');
    expect(result).toEqual({ success: true });

    // Verify the file was actually written
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toBe('# Test Content');
  });

  it('returns error for invalid path', () => {
    const badPath = path.join(
      os.tmpdir(),
      'nonexistent-dir-' + Date.now(),
      'subdir',
      'file.md',
    );

    const result = writeFileContent(badPath, 'content');
    expect(result).toEqual(
      expect.objectContaining({ success: false }),
    );
    expect((result as { success: false; error: string }).error).toContain('ENOENT');
  });
});
