import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { SettingsRow } from '@/components/SettingsRow';
import { ACTIVITY_COUNT } from '@/constants/activities';
import { radius, spacing } from '@/constants/colors';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const { displayName, updateDisplayName } = useProfile();
  const { width } = useWindowDimensions();

  const [draft, setDraft] = useState<{ value: string; basedOn: string } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [message, setMessage] = useState('');

  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;
  const isSaving = status === 'saving';
  const draftName = draft && draft.basedOn === displayName ? draft.value : displayName;

  useEffect(() => {
    if (status !== 'saved') {
      return;
    }

    const timer = setTimeout(() => {
      setStatus('idle');
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  const handleSave = async () => {
    const trimmed = draftName.trim();

    if (!trimmed) {
      setStatus('error');
      setMessage('Enter a display name before saving.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      await updateDisplayName(trimmed);
      setDraft(null);
      setStatus('saved');
      setMessage('Display name saved. Your dashboard greeting is already updated.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Your display name could not be saved. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
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
              title="Student Profile"
              subtitle="This profile is stored locally on your device."
            />

            <View
              style={[
                styles.profileCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <ProfileAvatar name={displayName} size={88} showStatus />
              <AppText variant="h2" style={styles.name} numberOfLines={2}>
                {displayName}
              </AppText>
              <View style={[styles.rolePill, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="school-outline" size={14} color={colors.primary} />
                <AppText variant="label" tone="primary">
                  Student
                </AppText>
              </View>
              <AppText variant="caption" tone="secondary" style={styles.profileHint}>
                Your display name is used across the dashboard, profile, and
                settings.
              </AppText>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Edit display name" />
              <View
                style={[
                  styles.formCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <AppText variant="label" tone="secondary">
                  Display name
                </AppText>
                <View
                  style={[
                    styles.inputWrap,
                    {
                      backgroundColor: colors.surfaceMuted,
                      borderColor: isFocused ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="create-outline"
                    size={18}
                    color={isFocused ? colors.primary : colors.secondary}
                  />
                  <TextInput
                    value={draftName}
                    onChangeText={(value) => {
                      setDraft({ value, basedOn: displayName });
                      if (status === 'error') {
                        setStatus('idle');
                        setMessage('');
                      }
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onSubmitEditing={() => {
                      void handleSave();
                    }}
                    editable={!isSaving}
                    maxLength={40}
                    placeholder="Enter your display name"
                    placeholderTextColor={colors.secondary}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="done"
                    selectionColor={colors.primary}
                    accessibilityLabel="Display name"
                    style={[styles.input, { color: colors.text }]}
                  />
                </View>
                <View style={styles.helperRow}>
                  <AppText variant="caption" tone="secondary" style={styles.helperText}>
                    This name appears immediately on the Home Dashboard after saving.
                  </AppText>
                  <AppText variant="caption" tone="secondary">
                    {draftName.length}/40
                  </AppText>
                </View>

                <CustomButton
                  label={isSaving ? 'Saving...' : 'Save display name'}
                  icon="save-outline"
                  onPress={() => {
                    void handleSave();
                  }}
                  loading={isSaving}
                  disabled={isSaving}
                  fullWidth
                />

                {status === 'saved' && message ? (
                  <View
                    style={[
                      styles.feedback,
                      { backgroundColor: colors.successSoft, borderColor: colors.success },
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={colors.success}
                    />
                    <AppText variant="caption" style={[styles.feedbackText, { color: colors.success }]}>
                      {message}
                    </AppText>
                  </View>
                ) : null}

                {status === 'error' && message ? (
                  <View
                    style={[
                      styles.feedback,
                      { backgroundColor: colors.dangerSoft, borderColor: colors.danger },
                    ]}
                  >
                    <Ionicons name="alert-circle" size={18} color={colors.danger} />
                    <AppText variant="caption" style={[styles.feedbackText, { color: colors.danger }]}>
                      {message}
                    </AppText>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.section}>
              <SectionHeader title="Student details" />
              <View style={styles.detailList}>
                <SettingsRow
                  icon="school-outline"
                  title="Application role"
                  description="Student"
                />
                <SettingsRow
                  icon="flask-outline"
                  title="Registered laboratory activities"
                  description={`${ACTIVITY_COUNT} laboratory modules are registered in this build.`}
                />
                <SettingsRow
                  icon="color-palette-outline"
                  title="Appearance"
                  description={`Currently using ${isDark ? 'dark' : 'light'} mode.`}
                  onPress={() => router.push('/settings')}
                  accessibilityHint="Opens appearance settings"
                />
              </View>
            </View>

            <View
              style={[
                styles.note,
                { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
              ]}
            >
              <Ionicons name="lock-closed-outline" size={18} color={colors.secondary} />
              <AppText variant="caption" tone="secondary" style={styles.noteText}>
                No account or external authentication is used. Your display name is
                saved with AsyncStorage on this device.
              </AppText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
  },
  profileCard: {
    alignItems: 'center',
    padding: spacing.xxl,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
  },
  name: {
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  profileHint: {
    textAlign: 'center',
    maxWidth: 360,
  },
  section: {
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  formCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.sm + 2,
    minWidth: 0,
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  helperText: {
    flex: 1,
    minWidth: 0,
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
  detailList: {
    gap: spacing.sm,
  },
  note: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  noteText: {
    flex: 1,
    minWidth: 0,
  },
});
