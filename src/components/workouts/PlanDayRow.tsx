import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { images } from '@/assets/photos';
import type { PlanDay } from '@/data/types';
import { colors, radius, spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Photo } from '@/components/ui/Photo';

type Props = {
  day: PlanDay;
  onPress?: () => void;
};

/**
 * Figma plan row — the day's date column, artwork, session title and its
 * duration/exercise meta. Today's row is filled with `accentMuted`.
 */
export function PlanDayRow({ day, onPress }: Props) {
  const isRest = day.exerciseCount === 0;

  return (
    <Card
      onPress={onPress}
      disabled={isRest}
      style={[styles.card, day.isToday && styles.today, isRest && styles.rest]}
      accessibilityLabel={`${day.dateLabel}, ${day.title}`}
    >
      <View style={styles.date}>
        <Text
          variant="caption"
          color={day.isToday ? colors.accent : colors.textSecondary}
        >
          {day.dateLabel.split(' ')[0]}
        </Text>
        <Text
          variant="titleMd"
          color={day.isToday ? colors.accent : colors.textPrimary}
        >
          {day.dateLabel.split(' ')[1]}
        </Text>
      </View>

      <Photo
        source={images[day.image]}
        width={56}
        height={56}
        borderRadius={radius.sm}
        style={styles.thumb}
        accessibilityLabel={`${day.title} artwork`}
      />

      <View style={styles.copy}>
        <Text variant="titleMd" numberOfLines={1}>
          {day.title}
        </Text>
        <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {isRest ? day.focus : `${day.focus} · ${day.exerciseCount} exercises`}
        </Text>
        {!isRest ? (
          <View style={styles.meta}>
            <Feather name="clock" size={12} color={colors.textSecondary} />
            <Text variant="caption">{day.durationMin} min</Text>
          </View>
        ) : null}
      </View>

      {day.completed ? (
        <View style={styles.done}>
          <Feather name="check-circle" size={20} color={colors.accent} />
        </View>
      ) : day.isToday ? (
        <Feather name="chevron-right" size={20} color={colors.accent} />
      ) : (
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: 12 },
  today: { backgroundColor: colors.accentMuted, borderColor: colors.accent },
  rest: { opacity: 0.6 },
  date: { width: 34, alignItems: 'center', gap: 2 },
  thumb: { width: 56 },
  copy: { flex: 1, gap: 3 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  done: { width: 20, alignItems: 'center' },
});