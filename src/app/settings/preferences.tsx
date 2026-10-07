import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { appPreferenceOptions } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

/** Rows that toggle a boolean rather than pick a value. */
const BEHAVIOUR = [
  {
    id: 'auto-start-timer',
    label: 'Auto-start timers',
    detail: 'Begin each set without tapping go.',
    icon: 'play-circle',
    defaultValue: true,
  },
  {
    id: 'keep-screen-awake',
    label: 'Keep screen awake',
    detail: 'Stay lit while a workout is running.',
    icon: 'sun',
    defaultValue: true,
  },
  {
    id: 'haptic-feedback',
    label: 'Haptic feedback',
    detail: 'Vibrate on set completion and timer end.',
    icon: 'smartphone',
    defaultValue: false,
  },
  {
    id: 'dark-mode',
    label: 'Dark appearance',
    detail: 'DIV is dark by design — this locks it in.',
    icon: 'moon',
    defaultValue: true,
  },
  {
    id: 'reduce-motion',
    label: 'Reduce motion',
    detail: 'Minimise transitions across the app.',
    icon: 'wind',
    defaultValue: false,
  },
] as const;

/** One horizontal option strip: label + icon + the currently picked value. */
type ValuePicker = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
};

export default function AppPreferencesScreen() {
  const router = useRouter();

  const [units, setUnits] = useState<string>(appPreferenceOptions[0].value);
  const [weekStart, setWeekStart] = useState<string>(appPreferenceOptions[1].value);
  const [reminder, setReminder] = useState<string>(appPreferenceOptions[2].value);

  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(BEHAVIOUR.map((row) => [row.id, row.defaultValue]))
  );

  const pickers: ValuePicker[] = [
    { ...appPreferenceOptions[0], value: units, onChange: setUnits },
    { ...appPreferenceOptions[1], value: weekStart, onChange: setWeekStart },
    { ...appPreferenceOptions[2], value: reminder, onChange: setReminder },
  ];

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <TopAppBar title="App Preferences" onBack={() => router.back()} />
      }
    >
      {/* Value pickers */}
      <View style={styles.section}>
        <SectionHeader title="Display & Schedule" eyebrow="Values" />
        <View style={styles.pickers}>
          {pickers.map((picker) => (
            <Card key={picker.id} style={styles.picker}>
              <View style={styles.pickerHead}>
                <View style={styles.pickerIcon}>
                  <Feather name={picker.icon} size={18} color={colors.accent} />
                </View>
                <Text variant="titleMd">{picker.label}</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.options}
              >
                {picker.options.map((option) => {
                  const active = option === picker.value;

                  return (
                    <Card
                      key={option}
                      variant="selectable"
                      selected={active}
                      onPress={() => picker.onChange(option)}
                      style={styles.option}
                      accessibilityLabel={`${picker.label}: ${option}`}
                      testID={`pref-${picker.id}-${option}`}
                    >
                      <Text
                        variant="meta"
                        color={active ? colors.accent : colors.textSecondary}
                      >
                        {option}
                      </Text>
                    </Card>
                  );
                })}
              </ScrollView>
            </Card>
          ))}
        </View>
      </View>

      {/* Behaviour toggles */}
      <View style={styles.section}>
        <SectionHeader title="Workout Behaviour" eyebrow="Options" />
        <Card flush style={styles.listCard}>
          {BEHAVIOUR.map((row, index) => (
            <ToggleRow
              key={row.id}
              icon={row.icon}
              label={row.label}
              detail={row.detail}
              value={toggles[row.id] ?? false}
              divider={index === 0 ? undefined : styles.rowDivider}
              onChange={(next) =>
                setToggles((prev) => ({ ...prev, [row.id]: next }))
              }
            />
          ))}
        </Card>
      </View>

      {/* Reset */}
      <Card
        onPress={() => {
          setUnits(appPreferenceOptions[0].value);
          setWeekStart(appPreferenceOptions[1].value);
          setReminder(appPreferenceOptions[2].value);
          setToggles(
            Object.fromEntries(BEHAVIOUR.map((row) => [row.id, row.defaultValue]))
          );
        }}
        style={styles.reset}
        accessibilityLabel="Reset preferences"
      >
        <Feather name="refresh-cw" size={18} color={colors.textSecondary} />
        <Text variant="body" color={colors.textSecondary} style={styles.resetCopy}>
          Reset all preferences to defaults
        </Text>
      </Card>
    </Screen>
  );
}

function ToggleRow({
  icon,
  label,
  detail,
  value,
  divider,
  onChange,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  detail: string;
  value: boolean;
  divider?: object;
  onChange: (next: boolean) => void;
}) {
  return (
    <View style={[styles.row, divider]}>
      <View style={styles.rowIcon}>
        <Feather name={icon} size={18} color={colors.accent} />
      </View>

      <View style={styles.rowCopy}>
        <Text variant="body">{label}</Text>
        <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
          {detail}
        </Text>
      </View>

      <Toggle value={value} accessibilityLabel={label} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  pickers: { gap: spacing.md },
  picker: { gap: spacing.md },
  pickerHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  pickerIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: { gap: spacing.sm, paddingRight: spacing.md },
  option: { paddingHorizontal: 14, paddingVertical: 10 },
  listCard: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  rowDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: { flex: 1, gap: 2 },
  reset: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  resetCopy: { flex: 1 },
});