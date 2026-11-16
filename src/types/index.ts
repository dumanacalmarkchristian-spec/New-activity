import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type ThemeMode = 'light' | 'dark';

export type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  secondary: string;
  text: string;
  border: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  shadow: string;
  overlay: string;
}

export interface AppTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

export type LabStatus = 'demonstration' | 'placeholder';

export type LabDemo = 'counter' | 'navigation' | 'hooks' | 'responsive' | 'geofence';

export interface Laboratory {
  id: string;
  number: number;
  title: string;
  description: string;
  status: LabStatus;
  demo: LabDemo;
  icon: IoniconsName;
  estimatedMinutes: number;
  tags: string[];
}
