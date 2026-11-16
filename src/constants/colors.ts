import type { ThemeColors, ThemeMode } from '@/types';

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  primary: '#2563EB',
  primarySoft: '#DBEAFE',
  onPrimary: '#FFFFFF',
  secondary: '#64748B',
  text: '#0F172A',
  border: '#E2E8F0',
  success: '#15803D',
  successSoft: '#DCFCE7',
  warning: '#B45309',
  warningSoft: '#FEF3C7',
  danger: '#B91C1C',
  dangerSoft: '#FEE2E2',
  shadow: '#0F172A',
  overlay: 'rgba(15, 23, 42, 0.45)',
};

export const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceMuted: '#263449',
  primary: '#60A5FA',
  primarySoft: '#1E3A5F',
  onPrimary: '#0B1220',
  secondary: '#94A3B8',
  text: '#F8FAFC',
  border: '#334155',
  success: '#4ADE80',
  successSoft: '#14532D',
  warning: '#FBBF24',
  warningSoft: '#78350F',
  danger: '#F87171',
  dangerSoft: '#7F1D1D',
  shadow: '#000000',
  overlay: 'rgba(2, 6, 23, 0.7)',
};

export const palettes: Record<ThemeMode, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export const layout = {
  maxContentWidth: 760,
  tabBarHeight: 62,
} as const;
