export type Theme = 'light' | 'dark';

// Storage interface that unifies localStorage and mock storage
interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const THEME_KEY = 'theme';

// Mock localStorage for testing
let mockStorage: Record<string, string> = {};
let useMockStorage = false;

export function enableMockStorage(): void {
  useMockStorage = true;
  mockStorage = {};
}

export function disableMockStorage(): void {
  useMockStorage = false;
  mockStorage = {};
}

function getStorage(): StorageLike {
  if (useMockStorage) {
    return {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      removeItem: (key: string) => { delete mockStorage[key]; },
    };
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  // SSR fallback — in-memory storage
  return {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
    removeItem: (key: string) => { delete mockStorage[key]; },
  };
}

export function getStoredTheme(): Theme | null {
  const storage = getStorage();
  const stored = storage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return null;
}

export function setStoredTheme(theme: Theme): void {
  const storage = getStorage();
  storage.setItem(THEME_KEY, theme);
}

export function clearStoredTheme(): void {
  const storage = getStorage();
  storage.removeItem(THEME_KEY);
}

export function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'dark' ? 'light' : 'dark';
}

export function getDefaultTheme(systemPreference: Theme): Theme {
  const stored = getStoredTheme();
  return stored ?? systemPreference;
}

// Round trip: save and retrieve should return same value
export function themeRoundTrip(theme: Theme): Theme {
  setStoredTheme(theme);
  return getStoredTheme() ?? 'dark';
}

// Double toggle should return to original
export function doubleToggle(theme: Theme): Theme {
  const toggled = toggleTheme(theme);
  return toggleTheme(toggled);
}
