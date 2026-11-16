import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { LabDemoCard } from '@/components/labs/LabDemoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

export function NavigationDemo() {
  const { colors } = useTheme();

  return (
    <LabDemoCard
      title="Working navigation"
      description="Jump between the tab screens and the about screen from this stack route."
      footnote="Each button below performs real navigation through Expo Router. Use the back button to return to the laboratory."
    >
      <View style={styles.actions}>
        <CustomButton
          label="Open About Application"
          icon="information-circle-outline"
          onPress={() => router.push('/about')}
          fullWidth
        />
        <CustomButton
          label="Browse all activities"
          icon="list-outline"
          variant="secondary"
          onPress={() => router.push('/activities')}
          fullWidth
        />
        <CustomButton
          label="Open student profile"
          icon="person-outline"
          variant="outline"
          onPress={() => router.push('/profile')}
          fullWidth
        />
      </View>

      <View
        style={[
          styles.callout,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        <Ionicons name="git-branch-outline" size={18} color={colors.primary} />
        <AppText variant="caption" tone="secondary" style={styles.calloutText}>
          Stack routes such as this laboratory screen open over the tab navigator.
          Press the back arrow to return.
        </AppText>
      </View>
    </LabDemoCard>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  calloutText: {
    flex: 1,
    minWidth: 0,
  },
});
