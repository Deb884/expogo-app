import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';
import { Text } from '@/components/ui/Text';
import type { CalendarDay } from '@/data/types';

type Props = {
  days: CalendarDay[];
  weekdayLabels: readonly string[];
  selectedDay: number;
  onSelect: (day: number) => void;
};

/**
 * Figma "Training Calendar" month grid — seven columns of square day cells.
 * Scheduled days sit on `surfaceSunken`, completed days carry an accent tick,
 * today is outlined in the accent colour and the selected day is filled at the
 * 12dp radius from the design's "Selected date" token.
 */
export function CalendarGrid({ days, weekdayLabels, selectedDay, onSelect }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.weekRow}>
        {weekdayLabels.map((label, index) => (
          <View key={`${label}-${index}`} style={styles.cell}>
            <Text variant="caption" color={colors.textSecondary} align="center">
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day, index) => {
          if (day.day === 0) {
            return <View key={`pad-${index}`} style={styles.cell} />;
          }

          const isSelected = day.day === selectedDay;

          return (
            <Pressable
              key={day.day}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Day ${day.day}${
                day.hasWorkout ? ', workout scheduled' : ''
              }`}
              onPress={() => onSelect(day.day)}
              style={({ pressed }) => [
                styles.cell,
                styles.dayCell,
                day.hasWorkout && styles.dayWorkout,
                day.isToday && styles.dayToday,
                isSelected && styles.daySelected,
                pressed && styles.pressed,
              ]}
            >
              <Text
                variant="meta"
                color={
                  isSelected || day.isToday
                    ? colors.accent
                    : day.hasWorkout
                      ? colors.textPrimary
                      : colors.textSecondary
                }
              >
                {day.day}
              </Text>

              {day.completed ? <View style={styles.tick} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.sm },
  weekRow: { flexDirection: 'row', gap: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  cell: { flexGrow: 1, flexBasis: '12%', alignItems: 'center' },
  dayCell: {
    aspectRatio: 1,
    maxWidth: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dayWorkout: { backgroundColor: colors.surfaceSunken },
  dayToday: { borderColor: colors.accent },
  daySelected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderRadius: radius.lg,
  },
  pressed: { opacity: 0.7 },
  tick: {
    width: 4,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
});