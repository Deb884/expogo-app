import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { WizardStep } from '@/components/personalization/WizardStep';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { daysOfWeek, scheduleOptions } from '@/data';
import { colors, spacing } from '@/constants/theme';

const SCHEDULE_DETAIL: Record<string, string> = {
  '2': 'Two focused sessions. Great if your week is unpredictable.',
  '3': 'The balanced split — the most sustainable frequency.',
  '4': 'Upper/lower rotation with room to progress each lift.',
  '5': 'A dedicated session per day, with two rest days.',
};

export default function TrainingScheduleScreen() {
  const router = useRouter();
  const [frequency, setFrequency] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);

  const toggleDay = (index: number) =>
    setDays((prev) =>
      prev.includes(String(index))
        ? prev.filter((item) => item !== String(index))
        : [...prev, String(index)]
    );

  // Blocks the CTA until the frequency is picked and the day count matches it.
  const target = Number(frequency[0] ?? 0);
  const daysValid = target > 0 && days.length === target;

  return (
    <WizardStep
      testID="wizard-schedule"
      step={5}
      overline="Step 6 of 6"
      title="How often can you train?"
      body="Be honest here — a plan you actually finish beats a plan you abandon."
      options={scheduleOptions.map((option) => ({
        id: option.id,
        label: `${option.label} a week`,
        detail: SCHEDULE_DETAIL[option.id],
      }))}
      selected={frequency}
      onToggle={(id) => {
        setFrequency([id]);
        setDays([]);
      }}
      onBack={() => router.back()}
      onNext={() => router.push('/personalization/generating')}
      isLast
      nextDisabled={!daysValid}
      footer={
        <DayPicker days={days} onToggle={toggleDay} count={days.length} target={target} />
      }
    />
  );
}

function DayPicker({
  days,
  onToggle,
  count,
  target,
}: {
  days: string[];
  onToggle: (index: number) => void;
  count: number;
  target: number;
}) {
  return (
    <>
      <Text variant="overline" color={colors.accent}>
        Pick your training days
      </Text>

      <View style={styles.pickerRow}>
        {daysOfWeek.map((day, index) => {
          const active = days.includes(String(index));
          const full = !active && count >= target;

          return (
            <Card
              key={`${day}-${index}`}
              variant="selectable"
              selected={active}
              disabled={full}
              onPress={() => onToggle(index)}
              style={styles.day}
              accessibilityLabel={day}
              testID={`day-${index}`}
            >
              <Text
                variant="titleMd"
                color={active ? colors.accent : colors.textSecondary}
              >
                {day}
              </Text>
            </Card>
          );
        })}
      </View>

      <Text variant="caption" color={colors.textSecondary}>
        {target > 0
          ? `${count} of ${target} ${target === 1 ? 'day' : 'days'} selected`
          : 'Choose a frequency first.'}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  day: { flexGrow: 1, flexBasis: '12%', paddingVertical: spacing.md },
});