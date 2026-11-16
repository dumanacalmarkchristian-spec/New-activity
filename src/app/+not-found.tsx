import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BrandMark } from '@/components/BrandMark';
import { CustomButton } from '@/components/CustomButton';
import { useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/constants/colors';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <BrandMark size={64} />
        <AppText variant="h1" style={styles.title}>
          Screen not found
        </AppText>
        <AppText variant="body" tone="secondary" style={styles.message}>
          The route you opened does not exist in Mobile Laboratory Hub. Return to
          the dashboard to continue.
        </AppText>
        <CustomButton
          label="Back to Home"
          icon="home-outline"
          onPress={() => router.replace('/')}
          fullWidth
          style={styles.action}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.sm,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.lg,
  },
});
