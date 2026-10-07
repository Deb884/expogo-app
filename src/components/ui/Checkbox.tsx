import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius } from '@/constants/theme';

type Props = {
  checked: boolean;
  onToggle?: () => void;
  label: string;
};

/**
 * Figma "square-check": a 24dp control with a 2dp `accent` check glyph.
 */
export function Checkbox({ checked, onToggle, label }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      onPress={onToggle}
      hitSlop={8}
      style={styles.row}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Feather name="check" size={18} color={colors.accent} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { padding: 2 },
  box: {
    width: 24,
    height: 24,
    borderRadius: radius.xs,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: { borderColor: colors.accent },
});
