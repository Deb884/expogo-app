import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, layout } from '@/constants/theme';
import { Text } from '@/components/ui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Item = {
  route: string;
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

/** Figma bottom navigation destinations, in order. */
export const NAV_ITEMS: Item[] = [
  { route: '/home', label: 'Home', icon: 'home' },
  { route: '/workouts', label: 'Workouts', icon: 'activity' },
  { route: '/progress', label: 'Progress', icon: 'bar-chart-2' },
  { route: '/profile', label: 'Profile', icon: 'user' },
];

/**
 * Figma "Bottom Navigation" — a hairline-topped dark bar with four destinations.
 * Active destinations use the accent colour and a 12/600 label; inactive use
 * `textSecondary` at 12/400.
 */
export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.items}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
          const tint = active ? colors.accent : colors.textSecondary;

          return (
            <Pressable
              key={item.route}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
              onPress={() => router.push(item.route as never)}
              style={styles.item}
            >
              <Feather name={item.icon} size={22} color={tint} />
              <Text variant={active ? 'navActive' : 'navInactive'} numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 10,
    minHeight: layout.bottomNav,
  },
  items: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
});
