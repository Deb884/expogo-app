import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressDots } from '@/components/ui/Progress';
import { equipmentOptions } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function EquipmentScreen() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>(['none']);
  const [custom, setCustom] = useState('');

  const toggle = (id: string) => {
    // "No equipment" is mutually exclusive with everything else.
    if (id === 'none') {
      setSelected(selected.includes('none') ? [] : ['none']);
      return;
    }

    setSelected((prev) => {
      const withoutNone = prev.filter((item) => item !== 'none');
      return withoutNone.includes(id)
        ? withoutNone.filter((item) => item !== id)
        : [...withoutNone, id];
    });
  };

  const noneSelected = selected.includes('none');

  return (
    <Screen
      keyboardAware
      gap={spacing.lg}
      topBar={
        <View style={styles.header}>
          <ProgressDots total={6} index={4} />
        </View>
      }
      bottom={
        <View style={styles.actions}>
          <Button
            label="Back"
            variant="secondary"
            width="half"
            onPress={() => router.back()}
          />
          <Button
            label="Continue"
            width="half"
            disabled={selected.length === 0}
            onPress={() => router.push('/personalization/schedule')}
            testID="equipment-next"
          />
        </View>
      }
    >
      <View style={styles.copy}>
        <Text variant="overline" color={colors.accent}>
          Step 5 of 6
        </Text>
        <Text variant="h1">What equipment do you have?</Text>
        <Text variant="body" color={colors.textSecondary}>
          Select everything you can train with. Every plan stays achievable.
        </Text>
      </View>

      <View style={styles.grid}>
        {equipmentOptions.map((option) => {
          const active = selected.includes(option.id);

          return (
            <Card
              key={option.id}
              variant="selectable"
              selected={active}
              onPress={() => toggle(option.id)}
              style={styles.chip}
              accessibilityLabel={option.label}
              testID={`equipment-${option.id}`}
            >
              <View style={[styles.chipIcon, active && styles.chipIconOn]}>
                <Feather
                  name={option.id === 'none' ? 'x' : 'check'}
                  size={16}
                  color={active ? colors.onAccent : colors.textSecondary}
                />
              </View>
              <Text
                variant="meta"
                color={active ? colors.accent : colors.textSecondary}
                numberOfLines={1}
              >
                {option.label}
              </Text>
            </Card>
          );
        })}
      </View>

      {!noneSelected ? (
        <Card style={styles.custom}>
          <Text variant="label" color={colors.textSecondary}>
            Anything else?
          </Text>
          <TextFieldLike
            value={custom}
            onChangeText={setCustom}
            placeholder="Add your own equipment"
          />
        </Card>
      ) : (
        <Card style={styles.note}>
          <Feather name="info" size={16} color={colors.accent} />
          <Text variant="caption" color={colors.textSecondary} style={styles.noteCopy}>
            Bodyweight sessions only. Every movement in your plan can be done with
            no equipment at all.
          </Text>
        </Card>
      )}
    </Screen>
  );
}

/** Small inline input — avoids stacking a full labelled `TextField` here. */
function TextFieldLike({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (next: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      selectionColor={colors.accent}
      autoCapitalize="words"
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  copy: { gap: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.selectable,
  },
  chipIcon: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipIconOn: { backgroundColor: colors.accent },
  custom: { gap: spacing.sm },
  input: {
    height: 48,
    borderRadius: radius.card,
    backgroundColor: colors.surfaceSunken,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
  },
  note: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  noteCopy: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.sm },
});