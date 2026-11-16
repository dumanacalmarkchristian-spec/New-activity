import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { IoniconsName } from '@/types';

interface EmptyStateProps {
  icon?: IoniconsName;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'search-outline',
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={[styles.iconBox, { backgroundColor: colors.surfaceMuted }]}>
        <Ionicons name={icon} size={28} color={colors.secondary} />
      </View>
      <AppText variant="h3" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="body" tone="secondary" style={styles.message}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <CustomButton
          label={actionLabel}
          onPress={onAction}
          variant="outline"
          icon="refresh-outline"
          size="sm"
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: spacing.sm,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    maxWidth: 320,
  },
  action: {
    marginTop: spacing.md,
  },
});
