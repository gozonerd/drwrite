import { describe, it, expect, beforeEach } from 'vitest';
import { useKeybindingStore, matchesBinding } from './keybinding-store';

describe('keybinding-store', () => {
  beforeEach(() => {
    localStorage.clear();
    useKeybindingStore.getState().resetToDefaults();
  });

  it('has 5 default bindings', () => {
    const { bindings } = useKeybindingStore.getState();
    expect(bindings).toHaveLength(5);
    const ids = bindings.map((b) => b.id);
    expect(ids).toContain('file.open');
    expect(ids).toContain('file.save');
    expect(ids).toContain('file.saveAs');
    expect(ids).toContain('file.new');
    expect(ids).toContain('file.export');
  });

  it('getBinding returns correct binding by id', () => {
    const binding = useKeybindingStore.getState().getBinding('file.open');
    expect(binding).toBeDefined();
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    expect(binding!.label).toBe('Open File');
    expect(binding!.key).toBe('o');
    expect(binding!.ctrlKey).toBe(true);
    expect(binding!.shiftKey).toBe(false);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  });

  it('getBinding returns undefined for nonexistent id', () => {
    const binding = useKeybindingStore.getState().getBinding('nonexistent');
    expect(binding).toBeUndefined();
  });

  it('updateBinding changes key combo', () => {
    useKeybindingStore.getState().updateBinding('file.open', {
      key: 'p',
      ctrlKey: true,
      shiftKey: true,
      metaKey: false,
    });

    const binding = useKeybindingStore.getState().getBinding('file.open');
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    expect(binding!.key).toBe('p');
    expect(binding!.shiftKey).toBe(true);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  });

  it('updateBinding only changes specified properties', () => {
    useKeybindingStore.getState().updateBinding('file.save', { key: 'w' });

    const binding = useKeybindingStore.getState().getBinding('file.save');
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    expect(binding!.key).toBe('w');
    expect(binding!.ctrlKey).toBe(true); // unchanged
    expect(binding!.label).toBe('Save'); // unchanged
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  });

  it('resetToDefaults restores original bindings', () => {
    useKeybindingStore.getState().updateBinding('file.open', { key: 'z' });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(useKeybindingStore.getState().getBinding('file.open')!.key).toBe('z');

    useKeybindingStore.getState().resetToDefaults();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(useKeybindingStore.getState().getBinding('file.open')!.key).toBe('o');
  });

  it('persists overrides to localStorage', () => {
    useKeybindingStore.getState().updateBinding('file.open', { key: 'p' });

    const stored = localStorage.getItem('drwrite-keybindings');
    expect(stored).not.toBeNull();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parsed = JSON.parse(stored!);
    expect(parsed['file.open']).toBeDefined();
    expect(parsed['file.open'].key).toBe('p');
  });

  it('resetToDefaults clears localStorage', () => {
    useKeybindingStore.getState().updateBinding('file.open', { key: 'p' });
    expect(localStorage.getItem('drwrite-keybindings')).not.toBeNull();

    useKeybindingStore.getState().resetToDefaults();
    expect(localStorage.getItem('drwrite-keybindings')).toBeNull();
  });

  it('default bindings have correct key combos', () => {
    const { getBinding } = useKeybindingStore.getState();

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const open = getBinding('file.open')!;
    expect(open.key).toBe('o');
    expect(open.ctrlKey).toBe(true);

    const save = getBinding('file.save')!;
    expect(save.key).toBe('s');
    expect(save.ctrlKey).toBe(true);

    const saveAs = getBinding('file.saveAs')!;
    expect(saveAs.key).toBe('S');
    expect(saveAs.ctrlKey).toBe(true);
    expect(saveAs.shiftKey).toBe(true);

    const newFile = getBinding('file.new')!;
    expect(newFile.key).toBe('n');
    expect(newFile.ctrlKey).toBe(true);

    const exportFile = getBinding('file.export')!;
    expect(exportFile.key).toBe('e');
    expect(exportFile.ctrlKey).toBe(true);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  });
});

describe('matchesBinding', () => {
  it('matches Ctrl+O binding', () => {
    const binding = { id: 'test', label: 'Test', key: 'o', ctrlKey: true, shiftKey: false, metaKey: false };
    const event = new KeyboardEvent('keydown', { key: 'o', ctrlKey: true });
    expect(matchesBinding(event, binding)).toBe(true);
  });

  it('does not match when key differs', () => {
    const binding = { id: 'test', label: 'Test', key: 'o', ctrlKey: true, shiftKey: false, metaKey: false };
    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
    expect(matchesBinding(event, binding)).toBe(false);
  });

  it('does not match when modifier differs', () => {
    const binding = { id: 'test', label: 'Test', key: 'o', ctrlKey: true, shiftKey: false, metaKey: false };
    const event = new KeyboardEvent('keydown', { key: 'o', ctrlKey: false });
    expect(matchesBinding(event, binding)).toBe(false);
  });

  it('matches shift key requirement', () => {
    const binding = { id: 'test', label: 'Test', key: 'S', ctrlKey: true, shiftKey: true, metaKey: false };
    const event = new KeyboardEvent('keydown', { key: 'S', ctrlKey: true, shiftKey: true });
    expect(matchesBinding(event, binding)).toBe(true);
  });
});
