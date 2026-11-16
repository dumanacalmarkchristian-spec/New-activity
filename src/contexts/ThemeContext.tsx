import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as SystemUI from 'expo-system-ui';

import { palettes } from '@/constants/colors';
import { STORAGE_KEYS } from '@/constants/storage';
import type { AppTheme, ThemeColors, ThemeMode } from '@/types';
import { readStoredValue, removeStoredValue, writeStoredValue } from '@/utils/storage';

interface ThemeContextValue extends AppTheme {
  isReady: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  resetTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    const restoreTheme = async () => {
      const storedMode = await readStoredValue(STORAGE_KEYS.theme);

      if (isActive && isThemeMode(storedMode)) {
        setMode(storedMode);
      }

      if (isActive) {
        setIsReady(true);
      }
    };

    void restoreTheme();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    SystemUI.setBackgroundColorAsync(palettes[mode].background).catch(() => {
      // Some platforms do not support changing the native root background.
    });
  }, [isReady, mode]);

  const setThemeMode = useCallback(async (nextMode: ThemeMode) => {
    setMode(nextMode);
    const saved = await writeStoredValue(STORAGE_KEYS.theme, nextMode);

    if (!saved) {
      console.warn('Theme updated for this session, but it could not be persisted.');
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    await setThemeMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setThemeMode]);

  const resetTheme = useCallback(async () => {
    setMode('light');

    const removed = await removeStoredValue(STORAGE_KEYS.theme);

    if (!removed) {
      console.warn('Theme reset for this session, but stored data could not be cleared.');
    }
  }, []);

  const colors: ThemeColors = palettes[mode];

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors,
      isDark: mode === 'dark',
      isReady,
      setThemeMode,
      toggleTheme,
      resetTheme,
    }),
    [colors, isReady, mode, resetTheme, setThemeMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider.');
  }

  return context;
}
