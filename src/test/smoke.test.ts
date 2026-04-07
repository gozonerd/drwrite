import { describe, it, expect } from 'vitest';

describe('test setup', () => {
  it('vitest runs correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom environment is available', () => {
    expect(document).toBeDefined();
    expect(document.createElement('div')).toBeDefined();
  });

  it('window.drwrite mock is available', () => {
    expect(window.drwrite).toBeDefined();
    expect(window.drwrite.openFile).toBeDefined();
  });
});
