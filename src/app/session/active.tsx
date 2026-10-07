import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { IconButton } from '@/components/ui/IconButton';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { ProgressBar } from '@/components/ui/Progress';
import { images } from '@/assets/photos';
import { exercisesById, todayPlan } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

/** Fallback routine when the wizard has not been completed. */
const SESSION_EXERCISE_IDS = [
  'ex-barbell-squat',
  'ex-romanian-deadlift',
  'ex-glute-bridge',
  'ex-plank',
];

export default function ActiveWorkoutScreen() {
  const router = useRouter();

  const session = useMemo(
    () =>
      SESSION_EXERCISE_IDS.map((id) => exercisesById[id]).filter(
        (exercise) => exercise !== undefined
      ),
    []
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [doneSets, setDoneSets] = useState<Record<string, number>>({});

  const exercise = session[exerciseIndex] ?? session[0];
  const totalSets = exercise.sets ?? 1;
  const completed = doneSets[exercise.id] ?? 0;

  const completeSet = () => {
    const next = completed + 1;
    setDoneSets((prev) => ({ ...prev, [exercise.id]: next }));

    if (next >= totalSets) {
      // Exercise finished — rest, then roll to the next movement.
      router.push('/session/rest');
      return;
    }
    router.push('/session/rest');
  };

  const goToExercise = (index: number) => {
    if (index < 0 || index >= session.length) return;
    setExerciseIndex(index);
  };

  const elapsedSets = Object.values(doneSets).reduce((sum, n) => sum + n, 0);
  const totalSetsAll = session.reduce((sum, item) => sum + (item.sets ?? 1), 0);

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Active Workout"
          right={
            <IconButton
              name="x"
              accessibilityLabel="End workout"
              onPress={() => router.push('/session/complete')}
            />
          }
        />
      }
      bottom={
        <View style={styles.actions}>
          <Button
            label="Finish Workout"
            variant="secondary"
            onPress={() => router.push('/session/complete')}
            testID="active-finish"
          />
          <Button
            label={completed >= totalSets ? 'Next Exercise' : 'Complete Set'}
            onPress={completeSet}
            icon={<Feather name="check" size={18} color={colors.onAccent} />}
            testID="active-complete-set"
          />
        </View>
      }
    >
      <View style={styles.sessionMeta}>
        <Text variant="caption" color={colors.textSecondary}>
          {todayPlan.title}
        </Text>
        <Text variant="caption" color={colors.accent}>
          Exercise {exerciseIndex + 1} of {session.length}
        </Text>
      </View>

      <View style={styles.hero}>
        <Photo
          source={images[exercise.image]}
          width={342}
          height={300}
          borderRadius={0}
          accessibilityLabel={`${exercise.name} demonstration`}
        />
        <View style={styles.heroBody}>
          <Text variant="h2">{exercise.name}</Text>
          <Text variant="meta" color={colors.textSecondary}>
            {exercise.muscle}
          </Text>
        </View>
      </View>

      {/* Set progress */}
      <View style={styles.progressBlock}>
        <View style={styles.progressLabels}>
          <Text variant="titleMd">
            Set {Math.min(completed + 1, totalSets)} of {totalSets}
          </Text>
          <Text variant="meta" color={colors.accent}>
            {completed}/{totalSets} done
          </Text>
        </View>
        <ProgressBar progress={completed / totalSets} />
      </View>

      {/* Set checklist */}
      <Card flush style={styles.sets}>
        {Array.from({ length: totalSets }).map((_, index) => {
          const isDone = index < completed;
          const isCurrent = index === completed;

          return (
            <View
              key={index}
              style={[styles.setRow, index === 0 ? undefined : styles.divider]}
            >
              <View style={[styles.setBadge, isDone && styles.setBadgeDone]}>
                {isDone ? (
                  <Feather name="check" size={16} color={colors.onAccent} />
                ) : (
                  <Text
                    variant="meta"
                    color={isCurrent ? colors.accent : colors.textSecondary}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              <View style={styles.setCopy}>
                <Text
                  variant="body"
                  color={isDone ? colors.textSecondary : colors.textPrimary}
                >
                  Set {index + 1}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {exercise.reps
                    ? `${exercise.reps} reps`
                    : `${exercise.durationSec ?? 45}s work`}{' '}
                  · {exercise.restSec}s rest
                </Text>
              </View>

              {isCurrent ? (
                <Text variant="caption" color={colors.accent}>
                  Now
                </Text>
              ) : null}
            </View>
          );
        })}
      </Card>

      {/* Up next */}
      <View style={styles.upNext}>
        <Text variant="overline" color={colors.accent}>
          Up next
        </Text>
        <View style={styles.upNextRow}>
          {session.map((item, index) => {
            const done = (doneSets[item.id] ?? 0) >= (item.sets ?? 1);

            return (
              <Card
                key={item.id}
                onPress={() => goToExercise(index)}
                selected={index === exerciseIndex}
                style={styles.upNextCard}
                accessibilityLabel={item.name}
              >
                <Feather
                  name={done ? 'check-circle' : 'circle'}
                  size={18}
                  color={done ? colors.accent : colors.textSecondary}
                />
                <Text variant="caption" numberOfLines={1}>
                  {item.name}
                </Text>
              </Card>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Feather name="zap" size={16} color={colors.textSecondary} />
        <Text variant="caption" color={colors.textSecondary} style={styles.footerCopy}>
          {elapsedSets} of {totalSetsAll} sets complete
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { gap: spacing.sm },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    gap: 2,
    backgroundColor: 'rgba(2,3,1,0.86)',
  },
  progressBlock: { gap: spacing.sm },
  progressLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sets: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
  },
  divider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  setBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setBadgeDone: { backgroundColor: colors.accent },
  setCopy: { flex: 1, gap: 2 },
  upNext: { gap: spacing.sm },
  upNextRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  upNextCard: { flexGrow: 1, flexBasis: '45%', gap: 6, paddingVertical: 12 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerCopy: { flex: 1 },
});