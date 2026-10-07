import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconButton } from '@/components/ui/IconButton';
import { PlanDayRow } from '@/components/workouts/PlanDayRow';
import { images } from '@/assets/photos';
import { planWeek, todayPlan } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function WorkoutPlanScreen() {
  const router = useRouter();

  const sessions = planWeek.filter((day) => day.exerciseCount > 0);
  const totalMinutes = sessions.reduce((sum, day) => sum + day.durationMin, 0);
  const doneCount = sessions.filter((day) => day.completed).length;

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Workout Plan"
          right={
            <IconButton
              name="calendar"
              accessibilityLabel="Training calendar"
              onPress={() => router.push('/progress/calendar')}
            />
          }
        />
      }
      bottom={
        <Button
          label={`Start · ${todayPlan.title}`}
          onPress={() => router.push('/session/active')}
          icon={<Feather name="play" size={18} color={colors.onAccent} />}
          testID="plan-start"
        />
      }
    >
      <View style={styles.hero}>
        <Photo
          source={images.workoutPlanHero}
          width={342}
          height={220}
          borderRadius={0}
          accessibilityLabel="Weekly plan artwork"
        />
        <View style={styles.heroBody}>
          <Text variant="overline" color={colors.accent}>
            Week 8 · Intermediate
          </Text>
          <Text variant="h3">Push · Pull · Legs</Text>
          <Text variant="meta" numberOfLines={1}>
            Generated from your goal, schedule and equipment
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text variant="stat">{sessions.length}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Sessions
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text variant="stat">{totalMinutes}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Minutes
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text variant="stat" color={colors.accent}>
            {doneCount}
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            Completed
          </Text>
        </View>
      </View>

      <SectionHeader
        title="This Week"
        eyebrow="Schedule"
        action="Adjust"
        onAction={() => router.push('/personalization/schedule')}
      />

      <View style={styles.list}>
        {planWeek.map((day) => (
          <PlanDayRow
            key={day.id}
            day={day}
            onPress={() => router.push('/session/active')}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  heroBody: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.md,
    gap: 4,
    backgroundColor: 'rgba(2,3,1,0.86)',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.borderSubtle,
  },
  list: { gap: spacing.sm },
});