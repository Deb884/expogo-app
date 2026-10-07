import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { EmptyState } from '@/components/ui/EmptyState';
import { CalendarGrid } from '@/components/progress/CalendarGrid';
import {
  CALENDAR_RANGES,
  CALENDAR_TODAY,
  calendarDays,
  calendarRangeLabels,
  calendarWeekdayLabels,
  type CalendarRange,
} from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

const MONTH_LABEL = 'October 2026';

export default function TrainingCalendarScreen() {
  const router = useRouter();
  const [range, setRange] = useState<CalendarRange>('Month');
  const [selectedDay, setSelectedDay] = useState(CALENDAR_TODAY);

  const summary = calendarRangeLabels[range];

  const selected = useMemo(
    () => calendarDays.find((day) => day.day === selectedDay),
    [selectedDay]
  );

  const selectedHasWorkout = selected?.hasWorkout ?? false;
  const scheduledCount = calendarDays.filter((day) => day.hasWorkout).length;

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="Calendar" onBack={() => router.back()} />}
      bottom={
        selectedHasWorkout ? (
          <Button
            label={selected?.completed ? 'Review Session' : 'Start Session'}
            onPress={() => router.push('/session/active')}
            testID="calendar-start"
          />
        ) : undefined
      }
    >
      <SegmentedControl
        options={CALENDAR_RANGES}
        value={range}
        onChange={setRange}
        testID="calendar-range"
      />

      {scheduledCount === 0 ? (
        <EmptyState
          icon="calendar"
          title="Nothing scheduled"
          body="You have no sessions planned this month. Generate a plan to fill your calendar."
          actionLabel="Build my plan"
          onAction={() => router.push('/personalization/goal')}
          testID="calendar-empty"
        />
      ) : (
        <>
          <Card style={styles.monthCard}>
            <View style={styles.monthHeader}>
              <View style={styles.monthCopy}>
                <Text variant="overline" color={colors.accent}>
                  {range}
                </Text>
                <Text variant="h3">{MONTH_LABEL}</Text>
              </View>
              <View style={styles.nav}>
                <Feather name="chevron-left" size={18} color={colors.textSecondary} />
                <Feather name="chevron-right" size={18} color={colors.textSecondary} />
              </View>
            </View>

            <CalendarGrid
              days={calendarDays}
              weekdayLabels={calendarWeekdayLabels}
              selectedDay={selectedDay}
              onSelect={setSelectedDay}
            />

            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.swatch, styles.swatchWorkout]} />
                <Text variant="caption" color={colors.textSecondary}>
                  Scheduled
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.swatch, styles.swatchCompleted]} />
                <Text variant="caption" color={colors.textSecondary}>
                  Completed
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.swatch, styles.swatchToday]} />
                <Text variant="caption" color={colors.textSecondary}>
                  Today
                </Text>
              </View>
            </View>
          </Card>

          {/* Range summary */}
          <View style={styles.summary}>
            {summary.map((item) => (
              <View key={item.label} style={styles.summaryTile}>
                <Text variant="stat">{item.value}</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {item.label}
                </Text>
                {item.hint ? (
                  <Text variant="caption" color={colors.accentSoft}>
                    {item.hint}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>

          {/* Selected day */}
          <Card style={styles.selected}>
            <View style={styles.selectedHead}>
              <View style={styles.selectedCopy}>
                <Text variant="overline" color={colors.accent}>
                  {MONTH_LABEL.split(' ')[0]} {selectedDay}
                </Text>
                <Text variant="titleMd">
                  {selectedHasWorkout ? 'Lower Body Build' : 'Rest Day'}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {selectedHasWorkout
                    ? 'Quads · Hamstrings · Glutes · 38 min'
                    : 'No session planned. Recovery happens here.'}
                </Text>
              </View>

              {selected?.completed ? (
                <View style={styles.doneBadge}>
                  <Feather name="check" size={16} color={colors.onAccent} />
                </View>
              ) : null}
            </View>

            {selectedHasWorkout ? (
              <View style={styles.tags}>
                <Chip label="Strength" />
                <Chip label="Intermediate" />
                <Chip label="5 exercises" icon="list" />
              </View>
            ) : null}
          </Card>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  monthCard: { gap: spacing.md },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthCopy: { flex: 1, gap: 2 },
  nav: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 12, height: 12, borderRadius: radius.xs },
  swatchWorkout: { backgroundColor: colors.surfaceSunken },
  swatchCompleted: { backgroundColor: colors.accent },
  swatchToday: { borderWidth: 1, borderColor: colors.accent },
  summary: { flexDirection: 'row', gap: spacing.sm },
  summaryTile: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: spacing.md,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  selected: { gap: spacing.md },
  selectedHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  selectedCopy: { flex: 1, gap: 3 },
  doneBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});