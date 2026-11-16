import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { LabDemoCard } from '@/components/labs/LabDemoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

export function CounterDemo() {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);

  return (
    <LabDemoCard
      title="Live useState counter"
      description="This counter keeps its state locally inside this screen."
      footnote="Only this component re-renders when the value changes. The global theme and profile state are untouched."
    >
      <View
        style={[
          styles.counterBox,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        <AppText variant="display" tone="primary" style={styles.count}>
          {count}
        </AppText>
        <AppText variant="caption" tone="secondary">
          Current count
        </AppText>
      </View>

      <View style={styles.actions}>
        <CustomButton
          label="Increase"
          icon="add"
          onPress={() => setCount((current) => current + 1)}
          style={styles.actionButton}
        />
        <CustomButton
          label="Decrease"
          icon="remove"
          variant="secondary"
          disabled={count === 0}
          onPress={() => setCount((current) => Math.max(0, current - 1))}
          style={styles.actionButton}
        />
        <CustomButton
          label="Reset"
          icon="refresh-outline"
          variant="outline"
          disabled={count === 0}
          onPress={() => setCount(0)}
          style={styles.actionButton}
        />
      </View>
    </LabDemoCard>
  );
}

const styles = StyleSheet.create({
  counterBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  count: {
    fontSize: 52,
    lineHeight: 58,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionButton: {
    flexGrow: 1,
    flexBasis: 110,
  },
});
