import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { images } from '@/assets/photos';
import type { Workout } from '@/data/types';
import { colors, radius, spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/ui/Photo';
import { Chip } from '@/components/ui/Chip';

/** Intrinsic Figma photo box for a workout card. */
const PHOTO_W = 342;
const PHOTO_H = 196;

type Props = {
  workout: Workout;
  onPress?: () => void;
  /** Fixed width for horizontal rails; omit to fill the parent. */
  width?: number;
  testID?: string;
};

/**
 * Figma workout card — image-fill cover on top, then the title, a
 * duration/level meta line and a level chip. Used by Home recommendations,
 * Workout Library, Categories results and Saved Workouts.
 */
export function WorkoutCard({ workout, onPress, width, testID }: Props) {
  return (
    <Card
      onPress={onPress}
      flush
      style={width ? { width } : undefined}
      accessibilityLabel={`${workout.name}, ${workout.durationMin} minutes, ${workout.level}`}
      testID={testID}
    >
      <Photo
        source={images[workout.image]}
        width={PHOTO_W}
        height={PHOTO_H}
        borderRadius={0}
        accessibilityLabel={`${workout.name} artwork`}
      />

      <View style={styles.body}>
        <View style={styles.copy}>
          <Text variant="titleMd" numberOfLines={1}>
            {workout.name}
          </Text>

          <View style={styles.meta}>
            <Feather name="clock" size={13} color={colors.textSecondary} />
            <Text variant="meta">{workout.durationMin} min</Text>
            <View style={styles.dot} />
            <Text variant="meta">{workout.exerciseIds.length} exercises</Text>
          </View>
        </View>

        <Chip label={workout.level} selected={workout.level === 'Advanced'} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    padding: spacing.md,
  },
  copy: { flex: 1, gap: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: {
    width: 3,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
  },
});