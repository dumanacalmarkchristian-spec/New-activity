import type { Laboratory } from '@/types';

export const ACTIVITIES: Laboratory[] = [
  {
    id: 'laboratory-1',
    number: 1,
    title: 'React Native Fundamentals',
    description: 'Introduction to React Native components and layouts.',
    status: 'demonstration',
    demo: 'counter',
    icon: 'code-slash-outline',
    estimatedMinutes: 10,
    tags: ['Components', 'useState', 'StyleSheet'],
  },
  {
    id: 'laboratory-2',
    number: 2,
    title: 'Navigation and Screens',
    description: 'Working with multi-screen navigation.',
    status: 'demonstration',
    demo: 'navigation',
    icon: 'layers-outline',
    estimatedMinutes: 8,
    tags: ['Expo Router', 'Tabs', 'Stack'],
  },
  {
    id: 'laboratory-3',
    number: 3,
    title: 'React Hooks',
    description: 'Managing local UI state and side effects.',
    status: 'demonstration',
    demo: 'hooks',
    icon: 'timer-outline',
    estimatedMinutes: 12,
    tags: ['useState', 'useEffect', 'Cleanup'],
  },
  {
    id: 'laboratory-4',
    number: 4,
    title: 'Responsive Layout',
    description: 'Building adaptable mobile interfaces.',
    status: 'demonstration',
    demo: 'responsive',
    icon: 'resize-outline',
    estimatedMinutes: 10,
    tags: ['Flexbox', 'Dimensions', 'FlexWrap'],
  },
  {
    id: 'laboratory-5',
    number: 5,
    title: 'Custom Map and Geofencing',
    description: 'A future laboratory module for a custom location map and geofencing tracker.',
    status: 'placeholder',
    demo: 'geofence',
    icon: 'location-outline',
    estimatedMinutes: 0,
    tags: ['Planned', 'Maps', 'Geofencing'],
  },
];

export const ACTIVITY_COUNT = ACTIVITIES.length;

export const DEMONSTRATION_COUNT = ACTIVITIES.filter(
  (activity) => activity.status === 'demonstration',
).length;

export const PLACEHOLDER_COUNT = ACTIVITIES.filter(
  (activity) => activity.status === 'placeholder',
).length;

export function getActivityById(id: string | string[] | undefined): Laboratory | undefined {
  const activityId = Array.isArray(id) ? id[0] : id;
  return ACTIVITIES.find((activity) => activity.id === activityId);
}
