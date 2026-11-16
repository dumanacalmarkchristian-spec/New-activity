import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/constants/colors';

interface ThemeToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function ThemeToggle({
  value,
  onValueChange,
  disabled = false,
}: ThemeToggleProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
        <Ionicons
          name={value ? 'moon' : 'sunny'}
          size={20}
          color={colors.primary}
        />
      </View>
      <View style={styles.textGroup}>
        <AppText variant="bodyStrong">Dark mode</AppText>
        <AppText variant="caption" tone="secondary">
          {value ? 'Currently using the dark palette' : 'Currently using the light palette'}
        </AppText>
      </View>
      <Switch
        accessibilityLabel="Dark mode"
        accessibilityHint="Switches the app between light and dark appearance"
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? colors.onPrimary : colors.surface}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
});
