import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { IoniconsName } from '@/types';

interface SettingsRowProps {
  icon: IoniconsName;
  title: string;
  description?: string;
  onPress?: () => void;
  accessibilityHint?: string;
}

export function SettingsRow({
  icon,
  title,
  description,
  onPress,
  accessibilityHint,
}: SettingsRowProps) {
  const { colors } = useTheme();

  const content = (
    <>
      <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
        <Ionicons name={icon} size={19} color={colors.primary} />
      </View>
      <View style={styles.textGroup}>
        <AppText variant="bodyStrong">{title}</AppText>
        {description ? (
          <AppText variant="caption" tone="secondary" numberOfLines={2}>
            {description}
          </AppText>
        ) : null}
      </View>
      {onPress ? (
        <Ionicons name="chevron-forward" size={18} color={colors.secondary} />
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <View
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed ? styles.pressed : null,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    minHeight: 60,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textGroup: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
