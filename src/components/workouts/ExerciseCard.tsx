import React from 'react';
import { StyleSheet, View } from 'react-native';
import { images } from '@/assets/photos';
import type { Exercise } from '@/data/types';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/ui/Photo';
import { exerciseTarget } from './ExerciseRow';

type Props = {
  exercise: Exercise;
  onPress?: () => void;
  /** Two-up grid tile width. */
  width: number;
  testID?: string;
};

/**
 * Figma exercise grid tile — square artwork over a name and target line. Used by
 * the Exercise library inside Workout Detail.
 */
export function ExerciseCard({ exercise, onPress, width, testID }: Props) {
  return (
    <Card onPress={onPress} flush style={{ width }} testID={testID}>
      <Photo
        source={images[exercise.image]}
        width={width}
        height={width * 0.78}
        borderRadius={0}
        accessibilityLabel={`${exercise.name} demonstration`}
      />
      <View style={styles.body}>
        <Text variant="titleMd" numberOfLines={1}>
          {exercise.name}
        </Text>
        <Text variant="caption" numberOfLines={1}>
          {exercise.muscle}
        </Text>
        <Text variant="meta" numberOfLines={1} style={styles.target}>
          {exerciseTarget(exercise)}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: { padding: 12, gap: 3 },
  target: { marginTop: 2 },
});