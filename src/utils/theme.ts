export type Theme = 'light' | 'dark';

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

function getStorage(): Storage | Record<string, string> {
  if (useMockStorage) {
    return {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      removeItem: (key: string) => { delete mockStorage[key]; },
    } as unknown as Storage;
  }
  return typeof localStorage !== 'undefined' ? localStorage : mockStorage as unknown as Storage;
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
