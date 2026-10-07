import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { images } from '@/assets/photos';
import type { Workout } from '@/data/types';
import { colors, radius, spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/ui/Photo';

type Props = {
  workout: Workout;
  onPress?: () => void;
  /** Trailing slot, e.g. a "Saved" check chip. */
  trailing?: React.ReactNode;
  testID?: string;
};

const THUMB = 72;

/**
 * Figma compact workout row — 72dp rounded thumbnail beside the title and a
 * meta line. Used by the Workout Plan tab root and the library's compact list.
 */
export function WorkoutRow({ workout, onPress, trailing, testID }: Props) {
  return (
    <Card onPress={onPress} style={styles.card} testID={testID}>
      <Photo
        source={images[workout.image]}
        width={THUMB}
        height={THUMB}
        borderRadius={radius.sm}
        accessibilityLabel={`${workout.name} thumbnail`}
        style={styles.thumb}
      />

      <View style={styles.copy}>
        <Text variant="titleMd" numberOfLines={1}>
          {workout.name}
        </Text>
        <Text variant="meta" numberOfLines={1}>
          {workout.level} · {workout.calories} kcal
        </Text>
        <View style={styles.meta}>
          <Feather name="clock" size={12} color={colors.textSecondary} />
          <Text variant="caption">{workout.durationMin} min</Text>
          <View style={styles.dot} />
          <Text variant="caption">{workout.exerciseIds.length} exercises</Text>
        </View>
      </View>

      {trailing ?? <Feather name="chevron-right" size={20} color={colors.textSecondary} />}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  thumb: { width: THUMB },
  copy: { flex: 1, gap: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: {
    width: 3,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
  },
});