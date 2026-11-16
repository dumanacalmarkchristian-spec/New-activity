import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BrandMark } from '@/components/BrandMark';
import { CustomButton } from '@/components/CustomButton';
import { DashboardCard } from '@/components/DashboardCard';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { SectionHeader } from '@/components/SectionHeader';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ACTIVITIES,
  ACTIVITY_COUNT,
  DEMONSTRATION_COUNT,
  PLACEHOLDER_COUNT,
} from '@/constants/activities';
import { radius, spacing } from '@/constants/colors';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Laboratory } from '@/types';

function getGreeting(hour: number): string {
  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

function RecentActivityRow({
  activity,
  onPress,
}: {
  activity: Laboratory;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open Laboratory ${activity.number}: ${activity.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.recentRow,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.recentIcon, { backgroundColor: colors.primarySoft }]}>
        <Ionicons name={activity.icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.recentText}>
        <AppText variant="label" tone="primary">
          Laboratory {String(activity.number).padStart(2, '0')}
        </AppText>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {activity.title}
        </AppText>
      </View>
      <StatusBadge status={activity.status} />
      <Ionicons name="chevron-forward" size={17} color={colors.secondary} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const { displayName } = useProfile();
  const { width } = useWindowDimensions();

  const now = new Date();
  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;
  const isWide = width >= 720;
  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <BrandMark size={44} />
              <View style={styles.brandText}>
                <AppText variant="bodyStrong" numberOfLines={1}>
                  Mobile Laboratory Hub
                </AppText>
                <AppText variant="caption" tone="secondary" numberOfLines={1}>
                  Academic dashboard
                </AppText>
              </View>
            </View>

            <View style={styles.topActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open settings"
                onPress={() => router.push('/settings')}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  pressed ? styles.pressed : null,
                ]}
              >
                <Ionicons name="settings-outline" size={20} color={colors.text} />
              </Pressable>
              <ProfileAvatar
                name={displayName}
                size={42}
                showStatus
                onPress={() => router.push('/profile')}
              />
            </View>
          </View>

          <View style={styles.greeting}>
            <View style={styles.greetingMeta}>
              <AppText variant="label" tone="primary">
                {getGreeting(now.getHours())}
              </AppText>
              <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
              <AppText variant="caption" tone="secondary" numberOfLines={1}>
                {formattedDate}
              </AppText>
            </View>
            <AppText variant="display">Welcome back,</AppText>
            <AppText variant="display" tone="primary" numberOfLines={2}>
              {displayName}!
            </AppText>
          </View>

          <View style={[styles.hero, { backgroundColor: colors.primary }]}>
            <View
              pointerEvents="none"
              style={[styles.heroCircleLarge, { borderColor: 'rgba(255,255,255,0.18)' }]}
            />
            <View
              pointerEvents="none"
              style={[styles.heroCircleSmall, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
            />
            <View style={styles.heroContent}>
              <View style={styles.heroLabelRow}>
                <Ionicons name="flask" size={15} color={colors.onPrimary} />
                <AppText variant="label" tone="onPrimary">
                  Master compilation
                </AppText>
              </View>
              <AppText variant="h2" tone="onPrimary" style={styles.heroTitle}>
                One hub for every laboratory activity
              </AppText>
              <AppText variant="body" tone="onPrimary" style={styles.heroDescription}>
                Review the demonstration modules, explore working React Native
                examples, and make room for future laboratories.
              </AppText>
              <CustomButton
                label="Browse Activities"
                icon="arrow-forward"
                variant="secondary"
                onPress={() => router.push('/activities')}
                fullWidth={!isWide}
              />
            </View>
          </View>

          <View style={styles.stats}>
            <StatCard
              value={ACTIVITY_COUNT}
              label="Total activities"
              icon="flask-outline"
              tone="primary"
            />
            <StatCard
              value={DEMONSTRATION_COUNT}
              label="Available modules"
              icon="code-slash-outline"
              tone="primary"
            />
            <StatCard
              value={PLACEHOLDER_COUNT}
              label="Placeholders"
              icon="location-outline"
              tone="warning"
            />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Quick access" />
            <View style={styles.grid}>
              <DashboardCard
                title="Laboratory Activities"
                subtitle="Browse the master list of laboratory modules."
                icon="flask-outline"
                onPress={() => router.push('/activities')}
                badge={`${ACTIVITY_COUNT} labs`}
                style={[
                  styles.gridItem,
                  { flexBasis: isWide ? '22%' : '45%', minWidth: isWide ? 140 : 150 },
                ]}
              />
              <DashboardCard
                title="My Profile"
                subtitle="View and edit your student display name."
                icon="person-outline"
                onPress={() => router.push('/profile')}
                style={[
                  styles.gridItem,
                  { flexBasis: isWide ? '22%' : '45%', minWidth: isWide ? 140 : 150 },
                ]}
              />
              <DashboardCard
                title="Settings"
                subtitle="Manage appearance and local preferences."
                icon="settings-outline"
                onPress={() => router.push('/settings')}
                style={[
                  styles.gridItem,
                  { flexBasis: isWide ? '22%' : '45%', minWidth: isWide ? 140 : 150 },
                ]}
              />
              <DashboardCard
                title="About Application"
                subtitle="Purpose, technology stack, and project details."
                icon="information-circle-outline"
                onPress={() => router.push('/about')}
                style={[
                  styles.gridItem,
                  { flexBasis: isWide ? '22%' : '45%', minWidth: isWide ? 140 : 150 },
                ]}
              />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Recent activities"
              actionLabel="See all"
              onAction={() => router.push('/activities')}
            />
            <View style={styles.recentList}>
              {ACTIVITIES.slice(0, 3).map((activity) => (
                <RecentActivityRow
                  key={activity.id}
                  activity={activity}
                  onPress={() =>
                    router.push({
                      pathname: '/lab/[id]',
                      params: { id: activity.id },
                    })
                  }
                />
              ))}
            </View>
          </View>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <AppText variant="caption" tone="secondary" style={styles.footerText}>
              Mobile Laboratory Hub · Master compilation for mobile computing
              laboratory activities.
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    flexShrink: 1,
    minWidth: 0,
  },
  brandText: {
    flexShrink: 1,
    minWidth: 0,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 0,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    gap: 1,
  },
  greetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: radius.pill,
  },
  hero: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  heroCircleLarge: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 26,
    top: -70,
    right: -60,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    bottom: -36,
    left: -24,
  },
  heroContent: {
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  heroLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    opacity: 0.92,
  },
  heroTitle: {
    maxWidth: 440,
  },
  heroDescription: {
    maxWidth: 500,
    opacity: 0.9,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm + 2,
  },
  gridItem: {
    flexGrow: 1,
  },
  recentList: {
    gap: spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  recentIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  recentText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  footer: {
    marginTop: spacing.xxl,
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
  pressed: {
    opacity: 0.75,
  },
});
