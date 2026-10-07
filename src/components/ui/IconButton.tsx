import React from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius } from '@/constants/theme';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  name: IconName;
  onPress?: () => void;
  size?: number;
  /** Icon colour; defaults to white. */
  color?: string;
  /** Renders the `surface` chip behind the icon (Figma "Icon button"). */
  surface?: boolean;
  disabled?: boolean;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Figma "Icon button": 48x48, 16dp radius, `surface` fill, 2dp-stroke icon.
 * Icons use Feather, which matches the Figma icon set (24px grid, 2px stroke).
 */
export function IconButton({
  name,
  onPress,
  size = 24,
  color = colors.textPrimary,
  surface = true,
  disabled,
  accessibilityLabel,
  style,
  testID,
}: Props) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        surface && styles.surface,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Feather name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.card,
  },
  surface: { backgroundColor: colors.surface },
  pressed: { backgroundColor: colors.surfaceSunken },
  disabled: { opacity: 0.5 },
});
