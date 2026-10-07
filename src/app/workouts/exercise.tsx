import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { Checkbox } from '@/components/ui/Checkbox';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ExerciseCard } from '@/components/workouts/ExerciseCard';
import { exerciseTarget } from '@/components/workouts/ExerciseRow';
import { images } from '@/assets/photos';
import { exercises, exercisesById } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

export default function ExerciseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { contentWidth } = useResponsive();

  const exercise = exercisesById[id ?? ''] ?? exercises[0];
  const [done, setDone] = useState<boolean[]>(() =>
    exercise.instructions.map(() => false)
  );

  const toggleStep = (index: number) =>
    setDone((prev) => prev.map((value, i) => (i === index ? !value : value)));

  const related = exercises.filter((item) => item.id !== exercise.id).slice(0, 4);
  const tileWidth = (contentWidth - spacing.sm) / 2;

  const setsLabel = String(exercise.sets ?? 0);
  const targetLabel = exercise.reps
    ? String(exercise.reps)
    : `${exercise.durationSec ?? 0}s`;

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="Exercise" onBack={() => router.back()} />}
      bottom={
        <Button
          label="Add to Workout"
          onPress={() => router.push('/session/active')}
          icon={<Feather name="plus" size={18} color={colors.onAccent} />}
        />
      }
    >
      <View style={styles.hero}>
        <Photo
          source={images[exercise.image]}
          width={342}
          height={280}
          borderRadius={0}
          accessibilityLabel={`${exercise.name} demonstration`}
        />
        <View style={styles.heroBadge}>
          <Text variant="meta" color={colors.accent}>
            {exerciseTarget(exercise)}
          </Text>
        </View>
      </View>

      <View style={styles.copy}>
        <Text variant="h2">{exercise.name}</Text>
        <Text variant="body" color={colors.textSecondary}>
          {exercise.muscle}
        </Text>
      </View>

      <Text variant="body" color={colors.textSecondary}>
        {exercise.description}
      </Text>

      {/* Presets */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text variant="stat">{setsLabel}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Sets
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="stat">{targetLabel}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            {exercise.reps ? 'Reps' : 'Duration'}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="stat">{exercise.restSec}s</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Rest
          </Text>
        </View>
      </View>

      {/* Steps — tickable so the screen behaves like a real guide */}
      <View style={styles.section}>
        <SectionHeader title="How to perform" eyebrow="Steps" />
        <Card flush style={styles.steps}>
          {exercise.instructions.map((step, index) => (
            <View
              key={step}
              style={[styles.step, index === 0 ? undefined : styles.stepDivider]}
            >
              <View style={styles.stepIndex}>
                <Text variant="caption" color={colors.accent}>
                  {index + 1}
                </Text>
              </View>

              <Text
                variant="body"
                color={colors.textSecondary}
                style={styles.stepCopy}
              >
                {step}
              </Text>

              <Checkbox
                checked={done[index] ?? false}
                onToggle={() => toggleStep(index)}
                label={`Step ${index + 1} complete`}
              />
            </View>
          ))}
        </Card>
      </View>

      {/* Form cues */}
      <View style={styles.section}>
        <SectionHeader title="Form cues" eyebrow="Coach" />
        <View style={styles.cues}>
          {exercise.cues.map((cue) => (
            <View key={cue} style={styles.cue}>
              <Feather name="check" size={14} color={colors.accent} />
              <Text variant="meta" color={colors.textSecondary}>
                {cue}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Related movements */}
      <View style={styles.section}>
        <SectionHeader
          title="Related"
          eyebrow="More exercises"
          action="Library"
          onAction={() => router.push('/workouts/library')}
        />
        <View style={styles.grid}>
          {related.map((item) => (
            <ExerciseCard
              key={item.id}
              exercise={item}
              width={tileWidth}
              onPress={() => router.push(`/workouts/exercise?id=${item.id}`)}
            />
          ))}
        </View>
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
  heroBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    paddingHorizontal: 12,
    height: 28,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(2,3,1,0.86)',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  copy: { gap: 4 },
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
  steps: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  stepDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  stepIndex: { width: 22, alignItems: 'center' },
  stepCopy: { flex: 1 },
  cues: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  cue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
