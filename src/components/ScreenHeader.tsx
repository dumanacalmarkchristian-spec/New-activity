import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
  compact?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
  compact = false,
}: ScreenHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, compact ? styles.compactContainer : null]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            hitSlop={8}
            style={({ pressed }) => [
              styles.backButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
              pressed ? styles.pressed : null,
            ]}
          >
            <Ionicons name="arrow-back" size={21} color={colors.text} />
          </Pressable>
        ) : null}

        <View style={styles.titleGroup}>
          <AppText variant="h1" numberOfLines={2}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText variant="caption" tone="secondary" style={styles.subtitle}>
              {subtitle}
            </AppText>
          ) : null}
        </View>

        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  compactContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGroup: {
    flex: 1,
    minWidth: 0,
  },
  subtitle: {
    marginTop: 2,
  },
  right: {
    flexShrink: 0,
  },
  pressed: {
    opacity: 0.7,
  },
});
