import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ExerciseRow } from '@/components/workouts/ExerciseRow';
import { images } from '@/assets/photos';
import { exercisesById, getCategory, getWorkout, workouts } from '@/data';
import { useSaved } from '@/state/saved';
import { colors, radius, spacing } from '@/constants/theme';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const workout = getWorkout(id ?? '') ?? workouts[0];
  const [saved, toggleSaved] = useSaved(workout.id);
  const category = getCategory(workout.categoryId);

  const list = workout.exerciseIds
    .map((exerciseId) => exercisesById[exerciseId])
    .filter(Boolean);

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Workout"
          onBack={() => router.back()}
          right={
            <IconButton
              name="bookmark"
              accessibilityLabel={saved ? 'Remove from saved' : 'Save workout'}
              color={saved ? colors.accent : colors.textPrimary}
              onPress={toggleSaved}
              testID="workout-detail-save"
            />
          }
        />
      }
      bottom={
        <Button
          label="Start Workout"
          onPress={() => router.push('/session/active')}
          icon={<Feather name="play" size={18} color={colors.onAccent} />}
          testID="workout-detail-start"
        />
      }
    >
      <View style={styles.hero}>
        <Photo
          source={images[workout.image]}
          width={342}
          height={240}
          borderRadius={0}
          accessibilityLabel={`${workout.name} artwork`}
        />
        <View style={styles.heroBody}>
          <Text variant="overline" color={colors.accent}>
            {category?.name ?? 'Workout'}
          </Text>
          <Text variant="h2">{workout.name}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.meta}>
          <Feather name="clock" size={16} color={colors.accent} />
          <Text variant="meta">{workout.durationMin} min</Text>
        </View>
        <View style={styles.meta}>
          <Feather name="zap" size={16} color={colors.accent} />
          <Text variant="meta">{workout.calories} kcal</Text>
        </View>
        <View style={styles.meta}>
          <Feather name="bar-chart-2" size={16} color={colors.accent} />
          <Text variant="meta">{workout.level}</Text>
        </View>
        <View style={styles.meta}>
          <Feather name="list" size={16} color={colors.accent} />
          <Text variant="meta">{workout.exerciseIds.length}</Text>
        </View>
      </View>

      <Text variant="body" color={colors.textSecondary}>
        {workout.description}
      </Text>

      <View style={styles.tags}>
        <Chip label={workout.level} selected={workout.level === 'Advanced'} />
        {workout.bodyweightOnly ? <Chip label="No equipment" icon="check" /> : null}
        {saved ? <Chip label="Saved" icon="bookmark" selected /> : null}
      </View>

      <SectionHeader
        title="Exercises"
        eyebrow={`${list.length} movements`}
      />

      <View style={styles.list}>
        {list.map((exercise, index) =>
          exercise ? (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              index={index + 1}
              onPress={() => router.push(`/workouts/exercise?id=${exercise.id}`)}
            />
          ) : null
        )}
      </View>

      <Card
        onPress={toggleSaved}
        style={styles.saveRow}
        accessibilityLabel={saved ? 'Remove from saved' : 'Save workout'}
      >
        <Feather
          name="bookmark"
          size={20}
          color={saved ? colors.accent : colors.textSecondary}
        />
        <Text variant="body" style={styles.saveCopy}>
          {saved ? 'Saved to your workouts' : 'Save this workout'}
        </Text>
        <View
          style={[
            styles.indicator,
            saved ? styles.indicatorOn : styles.indicatorOff,
          ]}
        >
          {saved ? <Feather name="check" size={14} color={colors.onAccent} /> : null}
        </View>
      </Card>
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
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  list: { gap: spacing.sm },
  saveRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  saveCopy: { flex: 1 },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorOn: { backgroundColor: colors.accent },
  indicatorOff: {
    borderWidth: 2,
    borderColor: colors.borderStrong,
  },
});