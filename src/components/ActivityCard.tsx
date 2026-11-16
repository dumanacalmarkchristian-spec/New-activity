import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/AppText';
import { StatusBadge } from '@/components/StatusBadge';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { Laboratory } from '@/types';

interface ActivityCardProps {
  activity: Laboratory;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ActivityCard({ activity, onPress, style }: ActivityCardProps) {
  const { colors } = useTheme();
  const statusLabel = activity.status === 'placeholder' ? 'placeholder' : 'demonstration';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Laboratory ${activity.number}: ${activity.title}`}
      accessibilityHint={`${statusLabel} module. Opens laboratory details.`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
        pressed ? styles.pressed : null,
        style,
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name={activity.icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.titleGroup}>
          <AppText variant="label" tone="primary">
            Laboratory {String(activity.number).padStart(2, '0')}
          </AppText>
          <AppText variant="h3" style={styles.title} numberOfLines={2}>
            {activity.title}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={19} color={colors.secondary} />
      </View>

      <AppText
        variant="body"
        tone="secondary"
        style={styles.description}
        numberOfLines={3}
      >
        {activity.description}
      </AppText>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <StatusBadge status={activity.status} />
        <View style={styles.openLabel}>
          <AppText variant="bodyStrong" tone="primary">
            Open activity
          </AppText>
          <Ionicons name="arrow-forward" size={15} color={colors.primary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  titleGroup: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    marginTop: 1,
  },
  description: {
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  openLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.87,
    transform: [{ scale: 0.992 }],
  },
});
