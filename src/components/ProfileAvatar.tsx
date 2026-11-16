import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileAvatarProps {
  name: string;
  size?: number;
  showStatus?: boolean;
  onPress?: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return 'ST';
  }

  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

  return `${first}${last}`.toUpperCase();
}

export function ProfileAvatar({
  name,
  size = 64,
  showStatus = false,
  onPress,
}: ProfileAvatarProps) {
  const { colors } = useTheme();
  const initials = getInitials(name);

  const avatar = (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
          borderColor: colors.primarySoft,
        },
      ]}
    >
      <AppText
        variant={size >= 72 ? 'h2' : 'button'}
        tone="onPrimary"
        style={{ fontSize: Math.max(14, size * 0.34), lineHeight: size * 0.42 }}
      >
        {initials}
      </AppText>
      {showStatus ? (
        <View
          style={[
            styles.status,
            {
              width: Math.max(14, size * 0.24),
              height: Math.max(14, size * 0.24),
              borderRadius: size,
              backgroundColor: colors.success,
              borderColor: colors.surface,
            },
          ]}
        />
      ) : null}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={`${name} avatar`}>{avatar}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open profile for ${name}`}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => (pressed ? styles.pressed : undefined)}
    >
      {avatar}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    overflow: 'hidden',
  },
  status: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});
