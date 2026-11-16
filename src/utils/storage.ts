import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readStoredValue(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read stored preference: ${key}`, error);
    return null;
  }
}

export async function writeStoredValue(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Unable to save preference: ${key}`, error);
    return false;
  }
}

export async function removeStoredValue(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Unable to remove preference: ${key}`, error);
    return false;
  }
}
