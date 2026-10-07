import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ListRow } from '@/components/ui/ListRow';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatTile } from '@/components/ui/StatTile';
import { BarChart } from '@/components/ui/BarChart';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { AchievementBadge } from '@/components/progress/AchievementBadge';
import {
  achievements,
  consistencyRate,
  measurements,
  monthlyVolume,
  progressHighlights,
  weeklyVolume,
} from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function ProgressScreen() {
  const router = useRouter();
  const unlocked = achievements.filter((item) => item.unlocked);

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar
          title="Progress"
          right={
            <IconButton
              name="calendar"
              accessibilityLabel="Training calendar"
              onPress={() => router.push('/progress/calendar')}
            />
          }
        />
      }
      bottom={
        <View style={styles.actions}>
          <Button
            label="Statistics"
            variant="secondary"
            width="half"
            onPress={() => router.push('/progress/statistics')}
          />
          <Button
            label="Calendar"
            width="half"
            onPress={() => router.push('/progress/calendar')}
          />
        </View>
      }
    >
      <View style={styles.grid}>
        {progressHighlights.map((item) => (
          <StatTile
            key={item.label}
            value={item.value}
            label={item.label}
            hint={item.hint}
            style={styles.gridTile}
          />
        ))}
      </View>

      {/* Weekly volume */}
      <View style={styles.section}>
        <SectionHeader
          title="Weekly Volume"
          eyebrow="Last 7 days"
          action="Details"
          onAction={() => router.push('/progress/statistics')}
        />
        <Card style={styles.chartCard}>
          <BarChart data={weeklyVolume} formatValue={(v) => (v > 0 ? `${v}` : '—')} />
        </Card>
      </View>

      {/* Consistency */}
      <Card style={styles.consistency}>
        <ProgressRing progress={consistencyRate} size={116} strokeWidth={10}>
          <Text variant="stat">{Math.round(consistencyRate * 100)}%</Text>
          <Text variant="caption" color={colors.textSecondary}>
            consistency
          </Text>
        </ProgressRing>

        <View style={styles.consistencyCopy}>
          <Text variant="titleMd">Strong month</Text>
          <Text variant="caption" color={colors.textSecondary}>
            You completed 18 of 21 planned sessions. Two more rest days than last
            month.
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text variant="caption" color={colors.textSecondary}>
              Target 80%
            </Text>
          </View>
        </View>
      </Card>

      {/* Eight-week trend */}
      <View style={styles.section}>
        <SectionHeader title="8 Week Trend" eyebrow="Total volume" />
        <Card style={styles.chartCard}>
          <BarChart data={monthlyVolume} height={120} />
        </Card>
      </View>

      {/* Measurements */}
      <View style={styles.section}>
        <SectionHeader title="Measurements" eyebrow="Body" />
        <Card flush style={styles.listCard}>
          {measurements.map((item, index) => (
            <ListRow
              key={item.id}
              icon={item.icon}
              title={item.label}
              subtitle={`${item.value} · ${item.delta}`}
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

      {/* Achievements preview */}
      <View style={styles.section}>
        <SectionHeader
          title="Achievements"
          eyebrow={`${unlocked.length} unlocked`}
          action="See all"
          onAction={() => router.push('/progress/achievements')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rail}
        >
          {achievements.map((item) => (
            <AchievementBadge key={item.id} achievement={item} width={104} />
          ))}
        </ScrollView>
      </View>

      <Card
        onPress={() => router.push('/progress/achievements')}
        style={styles.linkCard}
        accessibilityLabel="View all achievements"
      >
        <Feather name="award" size={20} color={colors.accent} />
        <Text variant="body" style={styles.linkCopy}>
          {unlocked.length} of {achievements.length} badges earned
        </Text>
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: spacing.sm },
  section: { gap: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridTile: { minWidth: '47%', flexGrow: 1 },
  chartCard: { paddingVertical: spacing.md },
  consistency: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  consistencyCopy: { flex: 1, gap: 6 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  rail: { gap: spacing.md, paddingRight: spacing.lg },
  linkCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  linkCopy: { flex: 1 },
});