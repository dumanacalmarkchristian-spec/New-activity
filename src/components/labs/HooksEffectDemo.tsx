import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { LabDemoCard } from '@/components/labs/LabDemoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

export function HooksEffectDemo() {
  const { colors } = useTheme();
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('Preparing the effect...');

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setMessage('useEffect ran after the screen mounted.');
    }, 700);

    const interval = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => {
      clearTimeout(messageTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <LabDemoCard
      title="Live useEffect timer"
      description="A timer starts after mounting and is cleaned up when you leave."
      footnote="The interval and timeout are cleared in the effect cleanup function, so no updates continue after this screen unmounts."
    >
      <View
        style={[
          styles.timerBox,
          { backgroundColor: colors.primarySoft, borderColor: colors.border },
        ]}
      >
        <AppText variant="caption" tone="secondary">
          Screen active for
        </AppText>
        <AppText variant="display" tone="primary" style={styles.timer}>
          {seconds}s
        </AppText>
      </View>

      <View
        style={[
          styles.messageBox,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: colors.success }]} />
        <AppText variant="bodyStrong" style={styles.message}>
          {message}
        </AppText>
      </View>

      <AppText variant="caption" tone="secondary">
        This is screen-specific UI state managed with useState and kept in sync by
        useEffect.
      </AppText>
    </LabDemoCard>
  );
}

const styles = StyleSheet.create({
  timerBox: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  timer: {
    fontSize: 44,
    lineHeight: 52,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    flexShrink: 0,
  },
  message: {
    flex: 1,
    minWidth: 0,
  },
});
