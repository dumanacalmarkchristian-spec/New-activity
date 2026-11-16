import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { CustomButton } from '@/components/CustomButton';
import { StatusBadge } from '@/components/StatusBadge';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';

const PLANNED_FEATURES = [
  'Custom map view for a selected area',
  'Adjustable geofence radius',
  'Enter and exit boundary events',
  'Location permission handling',
];

export function GeofencePlaceholder() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.hero,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: colors.warningSoft }]}>
          <Ionicons name="location-outline" size={34} color={colors.warning} />
        </View>
        <StatusBadge status="placeholder" />
        <AppText variant="h2" style={styles.title}>
          Future laboratory module
        </AppText>
        <AppText variant="body" tone="secondary" style={styles.message}>
          This screen is an intentional placeholder for the custom map and
          geofencing laboratory. It does not request location permissions, read GPS
          data, or track a device.
        </AppText>
      </View>

      <View
        style={[
          styles.panel,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <AppText variant="h3">Planned capabilities</AppText>
        <AppText variant="caption" tone="secondary">
          The items below describe the future scope only. None are active in this
          build.
        </AppText>

        <View style={styles.featureList}>
          {PLANNED_FEATURES.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <View style={[styles.bullet, { backgroundColor: colors.warningSoft }]}>
                <Ionicons name="ellipse" size={7} color={colors.warning} />
              </View>
              <AppText variant="body" tone="secondary" style={styles.featureText}>
                {feature}
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          styles.callout,
          { backgroundColor: colors.warningSoft, borderColor: colors.warning },
        ]}
      >
        <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
        <AppText variant="caption" style={[styles.calloutText, { color: colors.warning }]}>
          Placeholder status: no map, geofence, or location functionality is
          implemented in this version.
        </AppText>
      </View>

      <CustomButton
        label="Return to Activities"
        icon="arrow-back"
        variant="outline"
        onPress={() => router.push('/activities')}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    padding: spacing.xxl,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  message: {
    textAlign: 'center',
    maxWidth: 440,
  },
  panel: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
  },
  featureList: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bullet: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
    minWidth: 0,
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
});
