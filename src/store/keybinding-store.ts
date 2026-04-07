import { create } from 'zustand';

export interface Keybinding {
  id: string;
  label: string;
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}

interface KeybindingState {
  bindings: Keybinding[];
  getBinding: (id: string) => Keybinding | undefined;
  updateBinding: (id: string, updates: Partial<Pick<Keybinding, 'key' | 'ctrlKey' | 'shiftKey' | 'metaKey'>>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_BINDINGS: Keybinding[] = [
  { id: 'file.open', label: 'Open File', key: 'o', ctrlKey: true, shiftKey: false, metaKey: false },
  { id: 'file.save', label: 'Save', key: 's', ctrlKey: true, shiftKey: false, metaKey: false },
  { id: 'file.saveAs', label: 'Save As', key: 'S', ctrlKey: true, shiftKey: true, metaKey: false },
  { id: 'file.new', label: 'New File', key: 'n', ctrlKey: true, shiftKey: false, metaKey: false },
  { id: 'file.export', label: 'Export', key: 'e', ctrlKey: true, shiftKey: false, metaKey: false },
];

const STORAGE_KEY = 'drwrite-keybindings';

function loadOverrides(): Partial<Record<string, Partial<Pick<Keybinding, 'key' | 'ctrlKey' | 'shiftKey' | 'metaKey'>>>> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse errors
  }
  return {};
}

function saveOverrides(bindings: Keybinding[]) {
  const overrides: Record<string, Partial<Pick<Keybinding, 'key' | 'ctrlKey' | 'shiftKey' | 'metaKey'>>> = {};
  for (const binding of bindings) {
    const defaultBinding = DEFAULT_BINDINGS.find((d) => d.id === binding.id);
    if (
      defaultBinding &&
      (binding.key !== defaultBinding.key ||
        binding.ctrlKey !== defaultBinding.ctrlKey ||
        binding.shiftKey !== defaultBinding.shiftKey ||
        binding.metaKey !== defaultBinding.metaKey)
    ) {
      overrides[binding.id] = {
        key: binding.key,
        ctrlKey: binding.ctrlKey,
        shiftKey: binding.shiftKey,
        metaKey: binding.metaKey,
      };
    }
  }
  if (Object.keys(overrides).length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function buildInitialBindings(): Keybinding[] {
  const overrides = loadOverrides();
  return DEFAULT_BINDINGS.map((binding) => {
    const override = overrides[binding.id];
    if (override) {
      return { ...binding, ...override };
    }
    return { ...binding };
  });
}

export const useKeybindingStore = create<KeybindingState>((set, get) => ({
  bindings: buildInitialBindings(),

  getBinding: (id) => {
    return get().bindings.find((b) => b.id === id);
  },

  updateBinding: (id, updates) => {
    set((state) => {
      const newBindings = state.bindings.map((b) =>
        b.id === id ? { ...b, ...updates } : b,
      );
      saveOverrides(newBindings);
      return { bindings: newBindings };
    });
  },

  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ bindings: DEFAULT_BINDINGS.map((b) => ({ ...b })) });
  },
}));

/**
 * Check if a keyboard event matches a keybinding.
 */
export function matchesBinding(e: KeyboardEvent, binding: Keybinding): boolean {
  const mod = e.ctrlKey || e.metaKey;
  const wantsCtrl = binding.ctrlKey || binding.metaKey;

  if (wantsCtrl !== mod) return false;
  if (binding.shiftKey !== e.shiftKey) return false;
  if (e.key.toLowerCase() !== binding.key.toLowerCase()) return false;

  return true;
}
