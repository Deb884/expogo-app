import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { BarChart } from '@/components/ui/BarChart';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ListRow } from '@/components/ui/ListRow';
import {
  calendarRangeLabels,
  measurements,
  monthlyVolume,
  weeklyVolume,
  type CalendarRange,
} from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

const RANGES: { value: CalendarRange; label: string }[] = [
  { value: 'Week', label: 'Week' },
  { value: 'Month', label: 'Month' },
  { value: 'Year', label: 'Year' },
];

const PERSONAL_BESTS = [
  { id: 'squat', label: 'Barbell Squat', value: '92 kg', delta: '+7 kg', icon: 'trending-up' },
  { id: 'bench', label: 'Bench Press', value: '64 kg', delta: '+4 kg', icon: 'trending-up' },
  { id: 'deadlift', label: 'Romanian Deadlift', value: '110 kg', delta: '+10 kg', icon: 'trending-up' },
  { id: 'pullup', label: 'Pull-Up', value: '12 reps', delta: '+3 reps', icon: 'trending-up' },
] as const;

export default function StatisticsScreen() {
  const router = useRouter();
  const [range, setRange] = useState<CalendarRange>('Month');

  const summary = calendarRangeLabels[range];
  const volume = range === 'Week' ? weeklyVolume : monthlyVolume;

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Statistics"
          onBack={() => router.back()}
          right={
            <Card
              onPress={() => router.push('/progress/calendar')}
              style={styles.calendarChip}
              accessibilityLabel="Open calendar"
            >
              <Feather name="calendar" size={18} color={colors.accent} />
            </Card>
          }
        />
      }
    >
      <SegmentedControl options={RANGES} value={range} onChange={setRange} />

      <View style={styles.summary}>
        {summary.map((item) => (
          <StatTile
            key={item.label}
            value={item.value}
            label={item.label}
            hint={item.hint}
            style={styles.summaryTile}
          />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Training Volume" eyebrow={range} />
        <Card style={styles.chartCard}>
          <BarChart data={volume} height={150} />
        </Card>
      </View>

      <Card style={styles.split}>
        <ProgressRing progress={0.86} size={104} strokeWidth={9}>
          <Text variant="stat">86%</Text>
        </ProgressRing>
        <View style={styles.splitCopy}>
          <Text variant="titleMd">Goal completion</Text>
          <Text variant="caption" color={colors.textSecondary}>
            You hit 18 of 21 planned sessions. Two more rest days than last month.
          </Text>
          <View style={styles.splitRow}>
            <View style={styles.pill}>
              <Text variant="caption" color={colors.accent}>
                Target 80%
              </Text>
            </View>
            <View style={styles.pill}>
              <Text variant="caption" color={colors.accent}>
                +6% vs last month
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Measurements" eyebrow="Body" />
        <Card flush style={styles.listCard}>
          {measurements.map((item, index) => (
            <ListRow
              key={item.id}
              icon={item.icon}
              title={item.label}
              subtitle={item.value}
              trailing={
                <Text variant="meta" color={colors.accentSoft}>
                  {item.delta}
                </Text>
              }
              hideChevron
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Personal Bests" eyebrow="All time" />
        <Card flush style={styles.listCard}>
          {PERSONAL_BESTS.map((item, index) => (
            <ListRow
              key={item.id}
              icon={item.icon}
              title={item.label}
              trailing={
                <View style={styles.bestTrailing}>
                  <Text variant="body">{item.value}</Text>
                  <Text variant="caption" color={colors.accent}>
                    {item.delta}
                  </Text>
                </View>
              }
              hideChevron
              style={index === 0 ? undefined : styles.rowDivider}
            />
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  calendarChip: {
    width: 48,
    height: 48,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: { flexDirection: 'row', gap: spacing.sm },
  summaryTile: { flex: 1 },
  section: { gap: spacing.md },
  chartCard: { paddingVertical: spacing.md },
  split: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  splitCopy: { flex: 1, gap: 6 },
  splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  pill: {
    paddingHorizontal: 10,
    height: 24,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  bestTrailing: { alignItems: 'flex-end' },
});