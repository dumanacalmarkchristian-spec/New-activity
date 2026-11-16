import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BrandMark } from '@/components/BrandMark';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { radius, spacing } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';
import type { IoniconsName } from '@/types';

const TECHNOLOGIES: { label: string; icon: IoniconsName }[] = [
  { label: 'React Native', icon: 'logo-react' },
  { label: 'Expo SDK 58', icon: 'phone-portrait-outline' },
  { label: 'TypeScript', icon: 'code-slash-outline' },
  { label: 'Expo Router', icon: 'navigate-outline' },
  { label: 'React Context API', icon: 'git-network-outline' },
  { label: 'AsyncStorage', icon: 'save-outline' },
  { label: 'React Hooks', icon: 'repeat-outline' },
  { label: 'Flexbox Layouts', icon: 'grid-outline' },
];

const PROJECT_DETAILS = [
  { label: 'Project type', value: 'Master compilation application', icon: 'albums-outline' as IoniconsName },
  { label: 'Academic area', value: 'Mobile computing laboratory', icon: 'school-outline' as IoniconsName },
  { label: 'Platforms', value: 'Android and iOS with Expo', icon: 'phone-portrait-outline' as IoniconsName },
  { label: 'Application version', value: '1.0.0', icon: 'pricetag-outline' as IoniconsName },
];

export default function AboutScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
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
            title="About Application"
            subtitle="Purpose, technologies, and academic context."
            onBack={goBack}
          />

          <View
            style={[
              styles.hero,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <BrandMark size={76} />
            <AppText variant="h1" style={styles.appName}>
              Mobile Laboratory Hub
            </AppText>
            <View style={[styles.versionPill, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="pricetag-outline" size={13} color={colors.primary} />
              <AppText variant="label" tone="primary">
                Version 1.0.0
              </AppText>
            </View>
            <AppText variant="body" tone="secondary" style={styles.heroText}>
              A centralized mobile application where students can access, organize,
              view, and navigate their laboratory activities.
            </AppText>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Purpose" />
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <AppText variant="body" tone="secondary">
                Mobile Laboratory Hub serves as the final UI requirement and the
                master compilation application for all current and future laboratory
                activities. It provides a consistent academic dashboard, reusable
                components, global theme and profile state, and a scalable activity
                registry that new laboratory screens can join without redesigning the
                home dashboard.
              </AppText>
              <View
                style={[
                  styles.callout,
                  { backgroundColor: colors.primarySoft, borderColor: colors.primary },
                ]}
              >
                <Ionicons
                  name="flask-outline"
                  size={19}
                  color={colors.primary}
                />
                <AppText
                  variant="caption"
                  style={[styles.calloutText, { color: colors.primary }]}
                >
                  Demonstration modules are working UI examples. The geofencing
                  module is an explicit placeholder and is not yet implemented.
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Technologies used" />
            <View style={styles.techGrid}>
              {TECHNOLOGIES.map((technology) => (
                <View
                  key={technology.label}
                  style={[
                    styles.techChip,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                >
                  <View style={[styles.techIcon, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons
                      name={technology.icon}
                      size={15}
                      color={colors.primary}
                    />
                  </View>
                  <AppText variant="caption" style={styles.techLabel}>
                    {technology.label}
                  </AppText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Development team" />
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.teamHeader}>
                <View style={[styles.teamIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="people-outline" size={22} color={colors.primary} />
                </View>
                <View style={styles.teamText}>
                  <AppText variant="h3">Student Pair</AppText>
                  <AppText variant="caption" tone="secondary">
                    Replace the placeholder names below with the final team members.
                  </AppText>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.memberRow}>
                <Ionicons name="person-circle-outline" size={21} color={colors.secondary} />
                <View style={styles.memberText}>
                  <AppText variant="bodyStrong">Student Developer A</AppText>
                  <AppText variant="caption" tone="secondary">
                    UI, navigation, and application architecture
                  </AppText>
                </View>
              </View>
              <View style={styles.memberRow}>
                <Ionicons name="person-circle-outline" size={21} color={colors.secondary} />
                <View style={styles.memberText}>
                  <AppText variant="bodyStrong">Student Developer B</AppText>
                  <AppText variant="caption" tone="secondary">
                    State management, persistence, and laboratory modules
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Academic project information" />
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              {PROJECT_DETAILS.map((detail, index) => (
                <View key={detail.label}>
                  {index > 0 ? (
                    <View
                      style={[styles.divider, { backgroundColor: colors.border }]}
                    />
                  ) : null}
                  <View style={styles.detailRow}>
                    <View style={[styles.detailIcon, { backgroundColor: colors.surfaceMuted }]}>
                      <Ionicons name={detail.icon} size={16} color={colors.secondary} />
                    </View>
                    <View style={styles.detailText}>
                      <AppText variant="caption" tone="secondary">
                        {detail.label}
                      </AppText>
                      <AppText variant="bodyStrong">{detail.value}</AppText>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <AppText variant="caption" tone="secondary" style={styles.footerText}>
              Built with Expo and React Native for an academic mobile computing
              laboratory project.
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
    paddingBottom: spacing.xxl,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    padding: spacing.xxl,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
  },
  appName: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  versionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  heroText: {
    textAlign: 'center',
    maxWidth: 480,
    marginTop: spacing.xs,
  },
  section: {
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  calloutText: {
    flex: 1,
    minWidth: 0,
    fontWeight: '600',
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  techChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  techIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techLabel: {
    fontWeight: '600',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  teamIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 2,
  },
  memberText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  detailText: {
    flex: 1,
    minWidth: 0,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    textAlign: 'center',
  },
});
