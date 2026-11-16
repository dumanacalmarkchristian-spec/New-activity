import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';
import { radius, spacing } from '@/constants/colors';
import type { IoniconsName } from '@/types';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IoniconsName;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const sizeConfig: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; icon: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 12, icon: 15 },
  md: { paddingVertical: 11, paddingHorizontal: 17, icon: 18 },
  lg: { paddingVertical: 14, paddingHorizontal: 22, icon: 20 },
};

export function CustomButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  accessibilityLabel,
}: CustomButtonProps) {
  const { colors } = useTheme();
  const config = sizeConfig[size];
  const isDisabled = disabled || loading;

  const palette = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      foreground: colors.onPrimary,
    },
    secondary: {
      backgroundColor: colors.primarySoft,
      borderColor: colors.primarySoft,
      foreground: colors.primary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.border,
      foreground: colors.text,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      foreground: colors.primary,
    },
    danger: {
      backgroundColor: colors.dangerSoft,
      borderColor: colors.dangerSoft,
      foreground: colors.danger,
    },
  }[variant];

  const iconNode =
    loading ? (
      <ActivityIndicator size="small" color={palette.foreground} />
    ) : icon ? (
      <Ionicons name={icon} size={config.icon} color={palette.foreground} />
    ) : null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          paddingVertical: config.paddingVertical,
          paddingHorizontal: config.paddingHorizontal,
        },
        variant === 'primary' && !isDisabled
          ? {
              shadowColor: colors.shadow,
              shadowOpacity: 0.16,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 10,
              elevation: 3,
            }
          : null,
        fullWidth ? styles.fullWidth : null,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
    >
      <View style={styles.content}>
        {iconNode && iconPosition === 'left' ? iconNode : null}
        <AppText
          variant="button"
          style={{ color: palette.foreground }}
          numberOfLines={1}
        >
          {label}
        </AppText>
        {iconNode && iconPosition === 'right' ? iconNode : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
