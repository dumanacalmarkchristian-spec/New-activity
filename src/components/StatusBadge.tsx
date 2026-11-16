import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { LabStatus } from '@/types';

interface StatusBadgeProps {
  status: LabStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const { colors } = useTheme();

  const config =
    status === 'placeholder'
      ? { text: 'Placeholder', color: colors.warning, background: colors.warningSoft }
      : { text: 'Demo', color: colors.primary, background: colors.primarySoft };

  return (
    <View
      accessibilityLabel={`${label ?? config.text} module`}
      style={[styles.badge, { backgroundColor: config.background }]}
    >
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <AppText
        style={{ color: config.color, fontSize: 10, letterSpacing: 0.7 }}
        variant="label"
        numberOfLines={1}
      >
        {label ?? config.text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs + 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: radius.pill,
  },
});
