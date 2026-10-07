import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/constants/theme';
import { Text } from '@/components/ui/Text';
import type { PlanDay } from '@/data/types';

type Props = {
  week: PlanDay[];
  onSelect: (day: PlanDay) => void;
};

const TILE = 64;

/**
 * Figma weekly day strip — a horizontal rail of compact day tiles. Completed days
 * carry an accent tick, the current day is filled with `accentMuted` and shows
 * its label in the accent colour.
 */
export function PlanWeekStrip({ week, onSelect }: Props) {
  return (
    <FlatList
      data={week}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => {
        const isRest = item.exerciseCount === 0;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: item.isToday }}
            accessibilityLabel={`${item.dateLabel}, ${item.title}`}
            onPress={() => onSelect(item)}
            style={({ pressed }) => [
              styles.tile,
              item.isToday && styles.tileToday,
              isRest && styles.tileRest,
              pressed && styles.pressed,
            ]}
          >
            <Text
              variant="caption"
              color={item.isToday ? colors.accent : colors.textSecondary}
            >
              {item.day}
            </Text>

            {item.completed ? (
              <Feather name="check" size={18} color={colors.accent} />
            ) : (
              <Text
                variant="titleMd"
                color={item.isToday ? colors.textPrimary : colors.textSecondary}
              >
                {item.dateLabel.split(' ')[1]}
              </Text>
            )}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.sm, paddingRight: spacing.lg },
  tile: {
    width: TILE,
    height: TILE + 16,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tileToday: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  tileRest: { opacity: 0.6 },
  pressed: { backgroundColor: colors.surfaceSunken },
});