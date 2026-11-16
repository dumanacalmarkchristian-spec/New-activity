import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { SettingsRow } from '@/components/SettingsRow';
import { ThemeToggle } from '@/components/ThemeToggle';
import { radius, spacing } from '@/constants/colors';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { colors, isDark, mode, setThemeMode, resetTheme } = useTheme();
  const { resetDisplayName } = useProfile();
  const { width } = useWindowDimensions();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;

  const handleThemeChange = (value: boolean) => {
    setResetMessage('');
    void setThemeMode(value ? 'dark' : 'light');
  };

  const performReset = async () => {
    setIsResetting(true);
    setResetMessage('');

    await Promise.all([resetTheme(), resetDisplayName()]);

    setIsResetting(false);
    setIsConfirming(false);
    setResetMessage(
      'Preferences reset. The light theme is active and the display name is Student.',
    );
  };

  const palette = [
    { label: 'Background', color: colors.background },
    { label: 'Surface', color: colors.surface },
    { label: 'Primary', color: colors.primary },
    { label: 'Text', color: colors.text },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.content,
            { paddingHorizontal: horizontalPadding, maxWidth: 760 },
          ]}
        >
          <ScreenHeader
            title="Settings"
            subtitle="Appearance and local preferences for this device."
          />

          <View style={styles.section}>
            <SectionHeader title="Appearance" />
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <ThemeToggle
                value={isDark}
                onValueChange={handleThemeChange}
              />

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.currentThemeRow}>
                <View style={styles.currentThemeText}>
                  <AppText variant="bodyStrong">Current theme</AppText>
                  <AppText variant="caption" tone="secondary">
                    Changes apply instantly to every screen and the tab bar.
                  </AppText>
                </View>
                <View style={[styles.modePill, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons
                    name={isDark ? 'moon' : 'sunny'}
                    size={14}
                    color={colors.primary}
                  />
                  <AppText variant="label" tone="primary">
                    {mode}
                  </AppText>
                </View>
              </View>

              <View style={styles.paletteRow}>
                {palette.map((item) => (
                  <View key={item.label} style={styles.swatchGroup}>
                    <View
                      style={[
                        styles.swatch,
                        {
                          backgroundColor: item.color,
                          borderColor: colors.border,
                        },
                      ]}
                    />
                    <AppText variant="caption" tone="secondary" numberOfLines={1}>
                      {item.label}
                    </AppText>
                  </View>
                ))}
              </View>

              <View
                style={[
                  styles.infoRow,
                  { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="save-outline"
                  size={17}
                  color={colors.secondary}
                />
                <AppText variant="caption" tone="secondary" style={styles.infoText}>
                  Your theme is saved with AsyncStorage and restored the next time
                  the app starts.
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Shortcuts" />
            <View style={styles.shortcutList}>
              <SettingsRow
                icon="person-outline"
                title="Profile settings"
                description="Edit your display name and view student details."
                onPress={() => router.push('/profile')}
                accessibilityHint="Opens the student profile"
              />
              <SettingsRow
                icon="information-circle-outline"
                title="About application"
                description="Version, purpose, technologies, and project information."
                onPress={() => router.push('/about')}
                accessibilityHint="Opens the about screen"
              />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Reset preferences" />
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.resetHeader}>
                <View style={[styles.resetIcon, { backgroundColor: colors.dangerSoft }]}>
                  <Ionicons name="refresh-outline" size={20} color={colors.danger} />
                </View>
                <View style={styles.resetText}>
                  <AppText variant="bodyStrong">Reset local preferences</AppText>
                  <AppText variant="caption" tone="secondary">
                    Returns the app to the light theme and resets the display name
                    to Student.
                  </AppText>
                </View>
              </View>

              {isConfirming ? (
                <View style={styles.confirmBlock}>
                  <View
                    style={[
                      styles.confirmNotice,
                      { backgroundColor: colors.warningSoft, borderColor: colors.warning },
                    ]}
                  >
                    <Ionicons name="alert-circle-outline" size={18} color={colors.warning} />
                    <AppText
                      variant="caption"
                      style={[styles.confirmNoticeText, { color: colors.warning }]}
                    >
                      This action clears the saved theme and display name. Continue?
                    </AppText>
                  </View>
                  <View style={styles.confirmActions}>
                    <CustomButton
                      label="Cancel"
                      variant="outline"
                      onPress={() => setIsConfirming(false)}
                      disabled={isResetting}
                      style={styles.actionButton}
                    />
                    <CustomButton
                      label="Confirm reset"
                      variant="danger"
                      icon="trash-outline"
                      loading={isResetting}
                      disabled={isResetting}
                      onPress={() => {
                        void performReset();
                      }}
                      style={styles.actionButton}
                    />
                  </View>
                </View>
              ) : (
                <CustomButton
                  label="Reset preferences"
                  variant="outline"
                  icon="trash-outline"
                  onPress={() => {
                    setResetMessage('');
                    setIsConfirming(true);
                  }}
                  fullWidth
                />
              )}

              {resetMessage ? (
                <View
                  style={[
                    styles.feedback,
                    { backgroundColor: colors.successSoft, borderColor: colors.success },
                  ]}
                >
                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                  <AppText
                    variant="caption"
                    style={[styles.feedbackText, { color: colors.success }]}
                  >
                    {resetMessage}
                  </AppText>
                </View>
              ) : null}
            </View>
          </View>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <AppText variant="caption" tone="secondary" style={styles.footerText}>
              Mobile Laboratory Hub · All preferences stay on this device.
            </AppText>
            <AppText variant="caption" tone="secondary">
              v1.0.0
            </AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  currentThemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  currentThemeText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  modePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
    flexShrink: 0,
  },
  paletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  swatchGroup: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 54,
    flexGrow: 1,
  },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    minWidth: 0,
  },
  shortcutList: {
    gap: spacing.sm,
  },
  resetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  resetIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  resetText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  confirmBlock: {
    gap: spacing.md,
  },
  confirmNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  confirmNoticeText: {
    flex: 1,
    minWidth: 0,
    fontWeight: '600',
  },
  confirmActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionButton: {
    flexGrow: 1,
    flexBasis: 140,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  feedbackText: {
    flex: 1,
    minWidth: 0,
    fontWeight: '600',
  },
  footer: {
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  footerText: {
    flex: 1,
    minWidth: 0,
  },
});
