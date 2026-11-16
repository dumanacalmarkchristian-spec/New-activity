import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { DEFAULT_DISPLAY_NAME, STORAGE_KEYS } from '@/constants/storage';
import { readStoredValue, removeStoredValue, writeStoredValue } from '@/utils/storage';

interface ProfileContextValue {
  displayName: string;
  isReady: boolean;
  updateDisplayName: (name: string) => Promise<void>;
  resetDisplayName: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayName] = useState(DEFAULT_DISPLAY_NAME);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    const restoreProfile = async () => {
      const storedName = await readStoredValue(STORAGE_KEYS.displayName);

      if (isActive && storedName) {
        setDisplayName(normalizeName(storedName) || DEFAULT_DISPLAY_NAME);
      }

      if (isActive) {
        setIsReady(true);
      }
    };

    void restoreProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const updateDisplayName = useCallback(async (name: string) => {
    const normalized = normalizeName(name);

    if (!normalized) {
      throw new Error('Please enter a display name before saving.');
    }

    if (normalized.length > 40) {
      throw new Error('Display names must be 40 characters or fewer.');
    }

    const saved = await writeStoredValue(STORAGE_KEYS.displayName, normalized);

    if (!saved) {
      throw new Error('Your name could not be saved. Please try again.');
    }

    setDisplayName(normalized);
  }, []);

  const resetDisplayName = useCallback(async () => {
    setDisplayName(DEFAULT_DISPLAY_NAME);

    const removed = await removeStoredValue(STORAGE_KEYS.displayName);

    if (!removed) {
      console.warn('Name reset for this session, but stored data could not be cleared.');
    }
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({ displayName, isReady, updateDisplayName, resetDisplayName }),
    [displayName, isReady, resetDisplayName, updateDisplayName],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside a ProfileProvider.');
  }

  return context;
}
