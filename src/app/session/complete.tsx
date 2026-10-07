import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { StatTile } from '@/components/ui/StatTile';
import { Glow } from '@/components/ui/Glow';
import { images } from '@/assets/photos';
import { todayPlan } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function WorkoutCompleteScreen() {
  const router = useRouter();

  return (
    <Screen
      gap={spacing.lg}
      bottom={
        <View style={styles.actions}>
          <Button
            label="Back to Home"
            onPress={() => router.replace('/home')}
            testID="complete-home"
          />
          <Button
            label="View Progress"
            variant="secondary"
            onPress={() => router.replace('/progress')}
          />
        </View>
      }
    >
      <View style={styles.hero}>
        <Glow height={220} opacity={0.3} />
        <View style={styles.badge}>
          <Feather name="check" size={44} color={colors.onAccent} />
        </View>
        <Text variant="h1" align="center">
          Workout complete
        </Text>
        <Text variant="bodyCenter">
          {todayPlan.title} · {todayPlan.durationMin} minutes logged
        </Text>
      </View>

      <Photo
        source={images.activeWorkoutHero}
        width={342}
        height={200}
        accessibilityLabel="Workout complete artwork"
      />

      <View style={styles.stats}>
        <StatTile value="42:10" label="Duration" icon="clock" />
        <StatTile value="386" label="Calories" icon="zap" />
        <StatTile value="4/4" label="Exercises" icon="check-circle" />
      </View>

      <Card style={styles.streak}>
        <View style={styles.streakIcon}>
          <Feather name="award" size={22} color={colors.onAccent} />
        </View>
        <View style={styles.streakCopy}>
          <Text variant="titleMd">10 day streak</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Your longest run yet. Two more days unlocks a new badge.
          </Text>
        </View>
      </Card>

      <Card
        onPress={() => router.replace('/workouts/library')}
        style={styles.next}
        accessibilityLabel="Find another workout"
      >
        <Feather name="plus-circle" size={20} color={colors.accent} />
        <Text variant="body" style={styles.nextCopy}>
          Train another session today
        </Text>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { gap: spacing.sm },
  hero: { alignItems: 'center', gap: spacing.md },
  badge: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: { flexDirection: 'row', gap: spacing.sm },
  streak: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  streakIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCopy: { flex: 1, gap: 3 },
  next: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  nextCopy: { flex: 1 },
});