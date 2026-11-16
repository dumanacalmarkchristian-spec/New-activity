import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import type { IoniconsName } from '@/types';

interface TabIconProps {
  focused: boolean;
  color: string;
  active: IoniconsName;
  inactive: IoniconsName;
}

function TabIcon({ focused, color, active, inactive }: TabIconProps) {
  return (
    <Ionicons name={focused ? active : inactive} size={23} color={color} />
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarHideOnKeyboard: true,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home dashboard tab',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color as string}
              active="home"
              inactive="home-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          tabBarAccessibilityLabel: 'Laboratory activities tab',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color as string}
              active="flask"
              inactive="flask-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Student profile tab',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color as string}
              active="person"
              inactive="person-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarAccessibilityLabel: 'Settings tab',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              color={color as string}
              active="settings"
              inactive="settings-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}
