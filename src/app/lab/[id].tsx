import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BrandMark } from '@/components/BrandMark';
import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { CounterDemo } from '@/components/labs/CounterDemo';
import { GeofencePlaceholder } from '@/components/labs/GeofencePlaceholder';
import { HooksEffectDemo } from '@/components/labs/HooksEffectDemo';
import { NavigationDemo } from '@/components/labs/NavigationDemo';
import { ResponsiveDemo } from '@/components/labs/ResponsiveDemo';
import { getActivityById } from '@/constants/activities';
import { radius, spacing } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';
import type { LabDemo } from '@/types';

function DemonstrationContent({ demo }: { demo: LabDemo }) {
  switch (demo) {
    case 'counter':
      return <CounterDemo />;
    case 'navigation':
      return <NavigationDemo />;
    case 'hooks':
      return <HooksEffectDemo />;
    case 'responsive':
      return <ResponsiveDemo />;
    case 'geofence':
      return <GeofencePlaceholder />;
  }
}

export default function LaboratoryDetailScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ id: string }>();
  const activity = getActivityById(params.id);

  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/activities');
  };

  if (!activity) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.safe, { backgroundColor: colors.background }]}
      >
        <View style={[styles.content, { paddingHorizontal: horizontalPadding, maxWidth: 760 }]}>
          <ScreenHeader title="Laboratory" onBack={goBack} />
          <EmptyState
            icon="flask-outline"
            title="Laboratory not found"
            message="This laboratory module is not registered in the activity catalog."
            actionLabel="Back to Activities"
            onAction={() => router.replace('/activities')}
          />
        </View>
      </SafeAreaView>
    );
  }

  const isPlaceholder = activity.status === 'placeholder';

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
            title={`Laboratory ${String(activity.number).padStart(2, '0')}`}
            subtitle={activity.title}
            onBack={goBack}
          />

          <View
            style={[
              styles.hero,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.heroTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name={activity.icon} size={26} color={colors.primary} />
              </View>
              <View style={styles.heroHeading}>
                <AppText variant="label" tone="primary">
                  Laboratory {String(activity.number).padStart(2, '0')}
                </AppText>
                <AppText variant="h2">{activity.title}</AppText>
              </View>
              <StatusBadge status={activity.status} />
            </View>

            <AppText variant="body" tone="secondary">
              {activity.description}
            </AppText>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons
                  name={isPlaceholder ? 'calendar-outline' : 'time-outline'}
                  size={15}
                  color={colors.secondary}
                />
                <AppText variant="caption" tone="secondary">
                  {isPlaceholder
                    ? 'Scoped for a future laboratory'
                    : `About ${activity.estimatedMinutes} minutes`}
                </AppText>
              </View>
            </View>

            <View style={styles.tagRow}>
              {activity.tags.map((tag) => (
                <View
                  key={tag}
                  style={[
                    styles.tag,
                    { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
                  ]}
                >
                  <AppText variant="caption" tone="secondary">
                    {tag}
                  </AppText>
                </View>
              ))}
            </View>
          </View>

          {!isPlaceholder ? (
            <View
              style={[
                styles.demoNotice,
                { backgroundColor: colors.successSoft, borderColor: colors.success },
              ]}
            >
              <Ionicons name="checkmark-circle-outline" size={19} color={colors.success} />
              <AppText
                variant="caption"
                style={[styles.demoNoticeText, { color: colors.success }]}
              >
                Working demonstration module. This interactive screen illustrates the
                laboratory topic and is not presented as a graded submission.
              </AppText>
            </View>
          ) : null}

          <View style={styles.demoSection}>
            <DemonstrationContent demo={activity.demo} />
          </View>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <BrandMark size={30} variant="outline" />
            <AppText variant="caption" tone="secondary" style={styles.footerText}>
              Mobile Laboratory Hub · Laboratory module {activity.number} of 5
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
  hero: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  heroHeading: {
    flex: 1,
    minWidth: 160,
    gap: 1,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  demoNotice: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  demoNoticeText: {
    flex: 1,
    minWidth: 0,
    fontWeight: '600',
  },
  demoSection: {
    marginTop: spacing.lg,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerText: {
    flex: 1,
    minWidth: 0,
  },
});
