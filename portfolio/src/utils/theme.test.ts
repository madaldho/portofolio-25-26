import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import {
  toggleTheme,
  doubleToggle,
  themeRoundTrip,
  getDefaultTheme,
  enableMockStorage,
  disableMockStorage,
  setStoredTheme,
  getStoredTheme,
  clearStoredTheme,
  type Theme,
} from './theme';

/**
 * **Feature: portfolio-redesign, Property 8: Theme Toggle Round Trip**
 * **Validates: Requirements 7.1, 7.3**
 * 
 * For any initial theme state, toggling the theme and then toggling again SHALL return
 * to the original theme state. Additionally, saving a theme to localStorage and reading
 * it back SHALL return the same theme value.
 */
describe('Theme Toggle Round Trip', () => {
  const themeArb = fc.constantFrom<Theme>('light', 'dark');

  beforeEach(() => {
    enableMockStorage();
  });

  it('Property 8: Double toggle returns to original theme', () => {
    fc.assert(
      fc.property(themeArb, (theme: Theme) => {
        const result = doubleToggle(theme);
        expect(result).toBe(theme);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 8: Single toggle changes theme', () => {
    fc.assert(
      fc.property(themeArb, (theme: Theme) => {
        const toggled = toggleTheme(theme);
        expect(toggled).not.toBe(theme);
        expect(['light', 'dark']).toContain(toggled);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 8: Storage round trip preserves theme', () => {
    fc.assert(
      fc.property(themeArb, (theme: Theme) => {
        const result = themeRoundTrip(theme);
        expect(result).toBe(theme);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 8: Theme persists across multiple reads', () => {
    fc.assert(
      fc.property(themeArb, (theme: Theme) => {
        setStoredTheme(theme);
        
        // Multiple reads should return same value
        const read1 = getStoredTheme();
        const read2 = getStoredTheme();
        const read3 = getStoredTheme();
        
        expect(read1).toBe(theme);
        expect(read2).toBe(theme);
        expect(read3).toBe(theme);
      }),
      { numRuns: 100 }
    );
  });

  afterEach(() => {
    disableMockStorage();
  });
});

/**
 * **Feature: portfolio-redesign, Property 9: System Theme Preference Detection**
 * **Validates: Requirements 7.2**
 * 
 * For any system color scheme preference ('light' or 'dark'), when no user preference
 * is stored, the theme system SHALL default to the system preference.
 */
describe('System Theme Preference Detection', () => {
  const themeArb = fc.constantFrom<Theme>('light', 'dark');

  beforeEach(() => {
    enableMockStorage();
    clearStoredTheme();
  });

  it('Property 9: Defaults to system preference when no stored theme', () => {
    fc.assert(
      fc.property(themeArb, (systemPreference: Theme) => {
        clearStoredTheme();
        const result = getDefaultTheme(systemPreference);
        expect(result).toBe(systemPreference);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 9: Stored theme overrides system preference', () => {
    fc.assert(
      fc.property(
        themeArb,
        themeArb,
        (storedTheme: Theme, systemPreference: Theme) => {
          setStoredTheme(storedTheme);
          const result = getDefaultTheme(systemPreference);
          expect(result).toBe(storedTheme);
        }
      ),
      { numRuns: 100 }
    );
  });

  afterEach(() => {
    disableMockStorage();
  });
});
