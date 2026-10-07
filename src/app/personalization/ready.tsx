import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { Glow } from '@/components/ui/Glow';
import { PlanDayRow } from '@/components/workouts/PlanDayRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { images } from '@/assets/photos';
import { goalOptions, planWeek, profile } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function PlanReadyScreen() {
  const router = useRouter();
  const goal = goalOptions.find((option) => option.id === profile.goalId);

  const sessions = planWeek.filter((day) => day.exerciseCount > 0);
  const minutes = sessions.reduce((sum, day) => sum + day.durationMin, 0);

  return (
    <Screen
      gap={spacing.lg}
      bottom={
        <Button
          label="Start Training"
          onPress={() => router.replace('/home')}
          icon={<Feather name="play" size={18} color={colors.onAccent} />}
          testID="plan-ready-start"
        />
      }
    >
      <View style={styles.hero}>
        <Glow height={200} opacity={0.3} />
        <View style={styles.badge}>
          <Feather name="check" size={40} color={colors.onAccent} />
        </View>
        <Text variant="h1" align="center">
          Your plan is ready
        </Text>
        <Text variant="bodyCenter">
          Four weeks built around {goal?.label.toLowerCase() ?? 'your goal'} at{' '}
          {profile.level.toLowerCase()} level.
        </Text>
      </View>

      <Photo
        source={images.planReady}
        width={342}
        height={220}
        borderRadius={radius.card}
        accessibilityLabel="Plan ready artwork"
      />

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text variant="stat">{sessions.length}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Days a week
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="stat">{minutes}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Minutes
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="stat">4</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Weeks
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Week 1"
          eyebrow="Your schedule"
          action="Adjust"
          onAction={() => router.push('/personalization/schedule')}
        />
        <View style={styles.list}>
          {planWeek.map((day) => (
            <PlanDayRow
              key={day.id}
              day={day}
              onPress={() => router.replace('/workouts')}
            />
          ))}
        </View>
      </View>

      <Card
        onPress={() => router.replace('/workouts')}
        style={styles.link}
        accessibilityLabel="Open my full workout plan"
      >
        <Feather name="calendar" size={20} color={colors.accent} />
        <Text variant="body" style={styles.linkCopy}>
          See the full four-week plan
        </Text>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: spacing.md },
  badge: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: spacing.md,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  section: { gap: spacing.md },
  list: { gap: spacing.sm },
  link: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  linkCopy: { flex: 1 },
});