import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { LabDemoCard } from '@/components/labs/LabDemoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

function getBreakpoint(width: number): string {
  if (width >= 900) {
    return 'Expanded';
  }

  if (width >= 600) {
    return 'Medium';
  }

  return 'Compact';
}

export function ResponsiveDemo() {
  const { colors } = useTheme();
  const { width, height, fontScale } = useWindowDimensions();
  const orientation = width > height ? 'Landscape' : 'Portrait';
  const breakpoint = getBreakpoint(width);

  const metrics = [
    { label: 'Width', value: `${Math.round(width)} px` },
    { label: 'Height', value: `${Math.round(height)} px` },
    { label: 'Orientation', value: orientation },
    { label: 'Breakpoint', value: breakpoint },
  ];

  return (
    <LabDemoCard
      title="Live responsive metrics"
      description="Rotate the device or resize the window to see these values update."
      footnote="The layout uses useWindowDimensions, flexWrap, and flexible card widths instead of hardcoded device sizes."
    >
      <View style={styles.metricGrid}>
        {metrics.map((metric) => (
          <View
            key={metric.label}
            style={[
              styles.metric,
              { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
            ]}
          >
            <AppText variant="caption" tone="secondary">
              {metric.label}
            </AppText>
            <AppText variant="h3" numberOfLines={1}>
              {metric.value}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.flowRow}>
        {['Flexible', 'Wrapping', 'Cards'].map((item, index) => (
          <View
            key={item}
            style={[
              styles.flowCard,
              {
                backgroundColor: index === 1 ? colors.primarySoft : colors.surfaceMuted,
                borderColor: colors.border,
              },
            ]}
          >
            <AppText variant="bodyStrong" tone={index === 1 ? 'primary' : 'text'}>
              {item}
            </AppText>
            <AppText variant="caption" tone="secondary">
              Adapts to the available width
            </AppText>
          </View>
        ))}
      </View>

      <AppText variant="caption" tone="secondary">
        Font scale reported by the system: {fontScale.toFixed(2)}x. Text can scale
        without being clipped.
      </AppText>
    </LabDemoCard>
  );
}

const styles = StyleSheet.create({
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metric: {
    flexGrow: 1,
    flexBasis: 130,
    minWidth: 120,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 1,
  },
  flowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  flowCard: {
    flexGrow: 1,
    flexBasis: 150,
    minWidth: 140,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 2,
  },
});
