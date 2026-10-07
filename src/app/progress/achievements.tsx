import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { AchievementBadge } from '@/components/progress/AchievementBadge';
import { achievements } from '@/data';
import { colors, spacing } from '@/constants/theme';

type Filter = 'all' | 'unlocked' | 'locked';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unlocked', label: 'Earned' },
  { value: 'locked', label: 'In progress' },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('all');

  const unlockedCount = achievements.filter((item) => item.unlocked).length;
  const progress = unlockedCount / achievements.length;

  const visible = useMemo(() => {
    if (filter === 'unlocked') return achievements.filter((item) => item.unlocked);
    if (filter === 'locked') return achievements.filter((item) => !item.unlocked);
    return achievements;
  }, [filter]);

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="Achievements" onBack={() => router.back()} />}
    >
      <SegmentedControl options={FILTERS} value={filter} onChange={setFilter} />

      <View style={styles.summary}>
        <ProgressRing progress={progress} size={116} strokeWidth={10}>
          <Text variant="stat">
            {unlockedCount}/{achievements.length}
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            earned
          </Text>
        </ProgressRing>

        <View style={styles.summaryCopy}>
          <Text variant="h3">Keep going</Text>
          <Text variant="body" color={colors.textSecondary}>
            Four badges left. Your thirty day streak is the closest — you are nine
            days in.
          </Text>
        </View>
      </View>

      <View style={styles.list}>
        {visible.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  summaryCopy: { flex: 1, gap: 6 },
  list: { gap: spacing.md },
});