import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

interface LabDemoCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footnote?: string;
}

export function LabDemoCard({
  title,
  description,
  children,
  footnote,
}: LabDemoCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.accent, { backgroundColor: colors.primary }]} />
        <View style={styles.headerText}>
          <AppText variant="h3">{title}</AppText>
          {description ? (
            <AppText variant="caption" tone="secondary">
              {description}
            </AppText>
          ) : null}
        </View>
      </View>

      <View style={styles.body}>{children}</View>

      {footnote ? (
        <View style={[styles.footnote, { borderTopColor: colors.border }]}>
          <AppText variant="caption" tone="secondary">
            {footnote}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 2,
  },
  accent: {
    width: 4,
    borderRadius: radius.pill,
    alignSelf: 'stretch',
    minHeight: 38,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  body: {
    gap: spacing.md,
  },
  footnote: {
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
