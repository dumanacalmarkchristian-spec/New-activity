import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider as NavigationThemeProvider,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BrandMark } from '@/components/BrandMark';
import { ProfileProvider, useProfile } from '@/contexts/ProfileContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/constants/colors';

function LoadingScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.loading, { backgroundColor: colors.background }]}>
      <BrandMark size={64} />
      <View style={styles.loadingText}>
        <AppText variant="h2">Mobile Laboratory Hub</AppText>
        <AppText variant="caption" tone="secondary">
          Restoring your preferences...
        </AppText>
      </View>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
}

function AppNavigator() {
  const { colors, isDark, isReady: isThemeReady } = useTheme();
  const { isReady: isProfileReady } = useProfile();

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  if (!isThemeReady || !isProfileReady) {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LoadingScreen />
      </>
    );
  }

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="about" />
        <Stack.Screen name="lab/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <AppNavigator />
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xxl,
  },
  loadingText: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});
