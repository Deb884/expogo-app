import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
  /** Announced by screen readers when the row has no visible label. */
  accessibilityLabel: string;
  disabled?: boolean;
};

const TRACK_W = 52;
const TRACK_H = 32;
const KNOB = 24;

/**
 * Figma pill toggle: a `surfaceSunken` track with a white knob, switching to an
 * `accent` track when on. Settings state is local (spec §20).
 */
export function Toggle({ value, onChange, accessibilityLabel, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[styles.track, value && styles.trackOn, disabled && styles.disabled]}
    >
      <View style={[styles.knob, value && styles.knobOn]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  trackOn: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: radius.pill,
    backgroundColor: colors.textPrimary,
  },
  knobOn: { backgroundColor: colors.onAccent, alignSelf: 'flex-end' },
  disabled: { opacity: 0.5 },
});