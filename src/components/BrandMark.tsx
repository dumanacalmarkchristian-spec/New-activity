import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { radius } from '@/constants/colors';

interface BrandMarkProps {
  size?: number;
  variant?: 'filled' | 'outline';
}

export function BrandMark({ size = 44, variant = 'filled' }: BrandMarkProps) {
  const { colors } = useTheme();
  const isFilled = variant === 'filled';

  return (
    <View
      accessibilityLabel="Mobile Laboratory Hub logo"
      style={[
        styles.mark,
        {
          width: size,
          height: size,
          borderRadius: size * 0.3,
          backgroundColor: isFilled ? colors.primary : colors.surface,
          borderColor: isFilled ? colors.primary : colors.border,
        },
      ]}
    >
      <Ionicons
        name="flask"
        size={size * 0.52}
        color={isFilled ? colors.onPrimary : colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: radius.lg,
  },
});
