import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, layout } from '@/constants/theme';
import { Text } from './Text';

type Variant = 'primary' | 'secondary';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** `block` fills the parent; `auto` hugs the label. */
  width?: 'block' | 'auto' | 'half';
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * DIV button — 56dp tall, 16dp radius, Inter 16/700.
 * Primary: accent fill with `onAccent` label.
 * Secondary: surface fill with a `borderStrong` hairline and white label.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  width = 'block',
  style,
  testID,
}: Props) {
  const primary = variant === 'primary';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        width === 'block' && styles.block,
        width === 'half' && styles.half,
        // Pressed fill from the Figma "State=Pressed" specimen (#82D944).
        pressed && !disabled && (primary ? styles.primaryPressed : styles.secondaryPressed),
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        variant="button"
        color={primary ? colors.onAccent : colors.textPrimary}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: layout.control,
    borderRadius: radius.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  block: { alignSelf: 'stretch' },
  half: { flex: 1 },
  primary: { backgroundColor: colors.accent },
  primaryPressed: { backgroundColor: colors.accentPressed },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  secondaryPressed: { backgroundColor: colors.surfaceSunken },
  disabled: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    opacity: 0.6,
  },
  icon: { marginRight: 2 },
});
