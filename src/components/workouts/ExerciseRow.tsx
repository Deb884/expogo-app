import React from 'react';
import { StyleSheet, View } from 'react-native';
import { images } from '@/assets/photos';
import type { Exercise } from '@/data/types';
import { colors, radius, spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/ui/Photo';

/** "4 × 8" for rep targets, "45s" for timed work. */
export function exerciseTarget(exercise: Exercise): string {
  if (exercise.sets && exercise.reps) return `${exercise.sets} × ${exercise.reps}`;
  if (exercise.sets && exercise.durationSec) return `${exercise.sets} × ${exercise.durationSec}s`;
  if (exercise.durationSec) return `${exercise.durationSec}s`;
  if (exercise.reps) return `${exercise.reps} reps`;
  return '—';
}

type Props = {
  exercise: Exercise;
  /** 1-based position shown in the leading badge; omit to hide it. */
  index?: number;
  onPress?: () => void;
  /** Trailing slot, e.g. a completion tick or set counter. */
  trailing?: React.ReactNode;
  testID?: string;
};

/**
 * Figma exercise list row — numbered badge, name, muscle group and the
 * sets/reps target. Used by Workout Detail and Active Workout.
 */
export function ExerciseRow({ exercise, index, onPress, trailing, testID }: Props) {
  return (
    <Card onPress={onPress} style={styles.card} testID={testID}>
      {index !== undefined ? (
        <View style={styles.badge}>
          <Text variant="meta" color={colors.accent}>
            {String(index).padStart(2, '0')}
          </Text>
        </View>
      ) : null}

      <Photo
        source={images[exercise.image]}
        width={56}
        height={56}
        borderRadius={radius.sm}
        style={styles.thumb}
        accessibilityLabel={`${exercise.name} demonstration`}
      />

      <View style={styles.copy}>
        <Text variant="titleMd" numberOfLines={1}>
          {exercise.name}
        </Text>
        <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {exercise.muscle}
        </Text>
      </View>

      <View style={styles.trailing}>
        <Text variant="meta" color={colors.accent}>
          {exerciseTarget(exercise)}
        </Text>
        {trailing ?? null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: 12 },
  badge: {
    width: 26,
    alignItems: 'center',
  },
  thumb: { width: 56 },
  copy: { flex: 1, gap: 2 },
  trailing: { alignItems: 'flex-end', gap: 4 },
});