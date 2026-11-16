import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { IoniconsName } from '@/types';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  icon: IoniconsName;
  onPress: () => void;
  badge?: string;
  style?: StyleProp<ViewStyle>;
}

export function DashboardCard({
  title,
  subtitle,
  icon,
  onPress,
  badge,
  style,
}: DashboardCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={subtitle}
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
          <Ionicons name={icon} size={21} color={colors.primary} />
        </View>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: colors.surfaceMuted }]}>
            <AppText variant="caption" tone="secondary">
              {badge}
            </AppText>
          </View>
        ) : (
          <Ionicons name="arrow-forward" size={17} color={colors.secondary} />
        )}
      </View>
      <AppText variant="h3" style={styles.title} numberOfLines={2}>
        {title}
      </AppText>
      <AppText variant="caption" tone="secondary" numberOfLines={2}>
        {subtitle}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    minHeight: 136,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  title: {
    marginBottom: 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
