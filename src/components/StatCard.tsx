import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { IoniconsName } from '@/types';

type StatTone = 'primary' | 'success' | 'warning';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: IoniconsName;
  tone?: StatTone;
  style?: StyleProp<ViewStyle>;
}

export function StatCard({
  value,
  label,
  icon,
  tone = 'primary',
  style,
}: StatCardProps) {
  const { colors } = useTheme();

  const toneConfig = {
    primary: { foreground: colors.primary, background: colors.primarySoft },
    success: { foreground: colors.success, background: colors.successSoft },
    warning: { foreground: colors.warning, background: colors.warningSoft },
  }[tone];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: toneConfig.background }]}>
        <Ionicons name={icon} size={17} color={toneConfig.foreground} />
      </View>
      <AppText variant="h2" style={styles.value} numberOfLines={1}>
        {value}
      </AppText>
      <AppText variant="caption" tone="secondary" numberOfLines={2}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 88,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: 2,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 24,
    lineHeight: 28,
  },
});
