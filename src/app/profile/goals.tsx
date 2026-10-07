import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { goalOptions, profile } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

/**
 * "My Goals" — the Profile entry point into the Personalization wizard. Shows the
 * committed goal, and lets the user restart the wizard from any step.
 */
export default function MyGoalsScreen() {
  const router = useRouter();
  const [goalId, setGoalId] = useState(profile.goalId);

  const goal = goalOptions.find((option) => option.id === goalId) ?? goalOptions[0];

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="My Goals" onBack={() => router.back()} />}
      bottom={
        <Button
          label="Regenerate My Plan"
          onPress={() => router.push('/personalization/generating')}
          icon={<Feather name="refresh-cw" size={18} color={colors.onAccent} />}
          testID="goals-regenerate"
        />
      }
    >
      <Card style={styles.current}>
        <View style={styles.currentIcon}>
          <Feather name="target" size={22} color={colors.onAccent} />
        </View>
        <View style={styles.currentCopy}>
          <Text variant="caption" color={colors.textSecondary}>
            Current goal
          </Text>
          <Text variant="h3">{goal.label}</Text>
          <Text variant="caption" color={colors.textSecondary}>
            {goal.detail}
          </Text>
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Switch goal" eyebrow="Tap to change" />
        <View style={styles.options}>
          {goalOptions.map((option) => {
            const active = option.id === goalId;

            return (
              <Card
                key={option.id}
                variant="selectable"
                selected={active}
                onPress={() => setGoalId(option.id)}
                style={styles.option}
                accessibilityLabel={option.label}
                testID={`goal-${option.id}`}
              >
                <View style={[styles.optionIcon, active && styles.optionIconOn]}>
                  <Feather
                    name={option.icon}
                    size={20}
                    color={active ? colors.onAccent : colors.textSecondary}
                  />
                </View>

                <View style={styles.optionCopy}>
                  <Text variant="titleMd">{option.label}</Text>
                  <Text variant="caption" color={colors.textSecondary}>
                    {option.detail}
                  </Text>
                </View>

                {active ? (
                  <Feather name="check-circle" size={20} color={colors.accent} />
                ) : null}
              </Card>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Your setup" eyebrow="From the wizard" />
        <Card flush style={styles.summary}>
          <SummaryRow label="Fitness level" value={profile.level} />
          <SummaryRow label="Training preference" value="Gym" divider />
          <SummaryRow label="Weekly schedule" value="4 days" divider />
          <SummaryRow label="Equipment" value="Full gym" divider />
          <SummaryRow label="Member since" value={profile.memberSince} divider />
        </Card>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/personalization/information')}
        style={styles.editLink}
        hitSlop={8}
      >
        <Text variant="label" color={colors.accent} align="center">
          Adjust personal information
        </Text>
      </Pressable>
    </Screen>
  );
}

function SummaryRow({
  label,
  value,
  divider,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <View style={[styles.summaryRow, divider && styles.summaryDivider]}>
      <Text variant="body" color={colors.textSecondary}>
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  current: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  currentIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentCopy: { flex: 1, gap: 2 },
  section: { gap: spacing.md },
  options: { gap: spacing.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconOn: { backgroundColor: colors.accent },
  optionCopy: { flex: 1, gap: 2 },
  summary: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    gap: spacing.md,
  },
  summaryDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  editLink: { paddingVertical: spacing.sm },
});