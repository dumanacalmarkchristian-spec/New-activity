import { StyleSheet, Text, type TextProps } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeColors } from '@/types';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyStrong'
  | 'label'
  | 'caption'
  | 'button';

export type TextTone =
  | 'text'
  | 'secondary'
  | 'primary'
  | 'onPrimary'
  | 'success'
  | 'warning'
  | 'danger';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  tone?: TextTone;
}

const toneKey: Record<TextTone, keyof ThemeColors> = {
  text: 'text',
  secondary: 'secondary',
  primary: 'primary',
  onPrimary: 'onPrimary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export function AppText({
  variant = 'body',
  tone = 'text',
  style,
  ...rest
}: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[styles[variant], { color: colors[toneKey[tone]] }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  h2: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  bodyStrong: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  button: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});
