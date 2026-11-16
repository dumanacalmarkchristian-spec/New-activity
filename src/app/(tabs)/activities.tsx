import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityCard } from '@/components/ActivityCard';
import { AppText } from '@/components/AppText';
import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchBar } from '@/components/SearchBar';
import { ACTIVITIES } from '@/constants/activities';
import { radius, spacing } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';
import type { Laboratory } from '@/types';

export default function ActivitiesScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');

  const horizontalPadding = width < 360 ? spacing.lg : width >= 768 ? spacing.xxxl : spacing.xl;

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return ACTIVITIES;
    }

    return ACTIVITIES.filter((activity) => {
      const searchable = [
        activity.title,
        activity.description,
        `laboratory ${activity.number}`,
        String(activity.number),
        ...activity.tags,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [search]);

  const openActivity = (activity: Laboratory) => {
    router.push({
      pathname: '/lab/[id]',
      params: { id: activity.id },
    });
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.container,
          { paddingHorizontal: horizontalPadding, maxWidth: 760 },
        ]}
      >
        <ScreenHeader
          title="Laboratory Activities"
          subtitle="The master compilation of current and future modules."
          right={
            <View style={[styles.countPill, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="flask-outline" size={14} color={colors.primary} />
              <AppText variant="caption" tone="primary">
                {ACTIVITIES.length}
              </AppText>
            </View>
          }
        />

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search title, topic, or number"
        />

        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View
                style={[
                  styles.callout,
                  { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={colors.primary}
                />
                <AppText variant="caption" tone="secondary" style={styles.calloutText}>
                  Demonstration modules contain working UI demos. Placeholder modules
                  are clearly labeled and are not implemented yet.
                </AppText>
              </View>
              <AppText variant="caption" tone="secondary">
                {filteredActivities.length} of {ACTIVITIES.length} modules shown
              </AppText>
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              title="No laboratories found"
              message={
                search.trim()
                  ? `No modules match "${search.trim()}". Try a different keyword.`
                  : 'There are no laboratory modules available right now.'
              }
              actionLabel={search.trim() ? 'Clear search' : undefined}
              onAction={search.trim() ? () => setSearch('') : undefined}
            />
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <Ionicons name="add-circle-outline" size={17} color={colors.secondary} />
              <AppText variant="caption" tone="secondary" style={styles.footerText}>
                New laboratory screens can be registered in one activities file
                without changing the dashboard.
              </AppText>
            </View>
          }
          renderItem={({ item }) => (
            <ActivityCard activity={item} onPress={() => openActivity(item)} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  countPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  list: {
    flex: 1,
    marginTop: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  listHeader: {
    gap: spacing.sm + 2,
    marginBottom: spacing.md,
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
  },
  separator: {
    height: spacing.sm + 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  footerText: {
    flex: 1,
    minWidth: 0,
  },
});
