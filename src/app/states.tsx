import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonLines,
} from '@/components/ui/Skeleton';
import { ExerciseRow } from '@/components/workouts/ExerciseRow';
import { PlanDayRow } from '@/components/workouts/PlanDayRow';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { colors, radius, spacing } from '@/constants/theme';
import { exercises, planWeek } from '@/data';

/**
 * Developer gallery for the Figma "14 - States" section.
 *
 * Those six frames are empty, error and loading variants of existing screens
 * rather than pages you navigate to, so they live here as a deep-link-only QA
 * route (`div://states`). It is intentionally not linked from the tab bar or any
 * product screen.
 */
export default function StatesGalleryScreen() {
  const router = useRouter();
  const [attempt, setAttempt] = useState(1);

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="States"
          onBack={() => router.back()}
          right={
            <Feather name="eye" size={20} color={colors.textSecondary} />
          }
        />
      }
    >
      <Card style={styles.intro}>
        <Feather name="info" size={16} color={colors.accent} />
        <Text variant="caption" color={colors.textSecondary} style={styles.introCopy}>
          QA gallery for the six empty, error and loading frames in the design.
          Not part of the product navigation.
        </Text>
      </Card>

      {/* 1. Empty Saved Workouts */}
      <View style={styles.section}>
        <SectionHeader title="Empty Saved Workouts" eyebrow="State 1" />
        <Card style={styles.frame}>
          <EmptyState
            icon="bookmark"
            title="No saved workouts"
            body="Tap the bookmark on any workout to keep it here for quick access."
            actionLabel="Browse library"
            onAction={() => router.push('/workouts/library')}
          />
        </Card>
      </View>

      {/* 2. Empty Progress */}
      <View style={styles.section}>
        <SectionHeader title="Empty Progress" eyebrow="State 2" />
        <Card style={styles.frame}>
          <EmptyState
            icon="bar-chart-2"
            title="No progress yet"
            body="Finish your first workout and your charts, streaks and badges will appear here."
            actionLabel="Start today's workout"
            onAction={() => router.push('/session/active')}
          />
        </Card>
      </View>

      {/* 3. Empty Notifications */}
      <View style={styles.section}>
        <SectionHeader title="Empty Notifications" eyebrow="State 3" />
        <Card style={styles.frame}>
          <EmptyState
            icon="bell-off"
            title="No notifications"
            body="You are all caught up. Workout reminders and milestones will show up here."
          />
        </Card>
      </View>

      {/* 4. Network Error */}
      <View style={styles.section}>
        <SectionHeader title="Network Error" eyebrow="State 4" />
        <Card style={styles.frame}>
          <EmptyState
            icon="wifi-off"
            title="No connection"
            body="DIV needs a connection the first time you sync. Check your network and try again."
            actionLabel="Retry"
            onAction={() => setAttempt((prev) => prev + 1)}
            footnote={`Attempt ${attempt}`}
          />
        </Card>
      </View>

      {/* 5. Workout Loading */}
      <View style={styles.section}>
        <SectionHeader title="Workout Loading" eyebrow="State 5" />
        <Card style={styles.frame}>
          <View style={styles.loadingBlock}>
            <Skeleton height={200} borderRadius={radius.card} />
            <Skeleton width="64%" height={20} />
            <Skeleton width="40%" height={14} />
            <View style={styles.loadingList}>
              {exercises.slice(0, 3).map((exercise) => (
                <ExerciseRow key={exercise.id} exercise={exercise} />
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* 6. Profile Loading */}
      <View style={styles.section}>
        <SectionHeader title="Profile Loading" eyebrow="State 6" />
        <Card style={styles.frame}>
          <View style={styles.loadingBlock}>
            <View style={styles.identityRow}>
              <SkeletonAvatar size={96} />
              <View style={styles.identityCopy}>
                <Skeleton width="70%" height={20} />
                <Skeleton width="50%" height={13} />
              </View>
            </View>
            <SkeletonLines lines={3} />
            <View style={styles.statRow}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={78} borderRadius={radius.card} />
              ))}
            </View>
          </View>
        </Card>
      </View>

      {/* Extra: loading skeleton rails used across the app */}
      <View style={styles.section}>
        <SectionHeader title="Skeleton cards" eyebrow="Reusable" />
        <Card style={styles.frame}>
          <View style={styles.loadingBlock}>
            <SkeletonCard height={150} />
            <SkeletonCard height={150} />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Progress ring" eyebrow="Reusable" />
        <Card style={styles.ringFrame}>
          <ProgressRing progress={0} size={120} strokeWidth={10}>
            <Text variant="stat">0%</Text>
            <Text variant="caption" color={colors.textSecondary}>
              consistency
            </Text>
          </ProgressRing>
          <ProgressRing progress={1} size={120} strokeWidth={10}>
            <Text variant="stat" color={colors.accent}>
              100%
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              complete
            </Text>
          </ProgressRing>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Disabled plan day" eyebrow="Rest day" />
        <View style={styles.restList}>
          {planWeek
            .filter((day) => day.exerciseCount === 0)
            .map((day) => (
              <PlanDayRow key={day.id} day={day} />
            ))}
        </View>
      </View>

      <Button
        label="Back"
        variant="secondary"
        onPress={() => router.back()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  introCopy: { flex: 1 },
  section: { gap: spacing.md },
  frame: { minHeight: 260, justifyContent: 'center' },
  ringFrame: { flexDirection: 'row', gap: spacing.lg, justifyContent: 'center' },
  loadingBlock: { gap: spacing.md },
  loadingList: { gap: spacing.sm },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  identityCopy: { flex: 1, gap: 8 },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  restList: { gap: spacing.sm },
});