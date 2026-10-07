import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  /**
   * `card` is the 16dp surface block; `selectable` is the 18dp option card used
   * by the Personalization wizard (fills `accentMuted` when selected).
   */
  variant?: 'card' | 'selectable';
  selected?: boolean;
  /** Blocks presses and dims the card (rest days, locked content). */
  disabled?: boolean;
  /** Removes the 16dp inner padding (cards whose first child is full-bleed). */
  flush?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * Figma surface card. Flat design — a 1dp `borderSubtle` hairline instead of a
 * shadow, which is what every card in the file uses (the file has no effects).
 */
export function Card({
  children,
  onPress,
  variant = 'card',
  selected = false,
  disabled = false,
  flush = false,
  style,
  accessibilityLabel,
  testID,
}: Props) {
  const selectable = variant === 'selectable';

  const surface: StyleProp<ViewStyle> = [
    styles.base,
    selectable ? styles.selectable : styles.card,
    selected && styles.selected,
    !flush && styles.padded,
    disabled && styles.disabled,
    style,
  ];

  if (!onPress) {
    return (
      <View style={surface} testID={testID} accessibilityLabel={accessibilityLabel}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        selected: selectable ? selected : undefined,
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [surface, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  card: { borderRadius: radius.card },
  selectable: { borderRadius: radius.selectable },
  selected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  pressed: { backgroundColor: colors.surfaceSunken },
  disabled: { opacity: 0.6 },
  padded: { padding: spacing.md },
});