import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/constants/theme';
import { Text } from './Text';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  /** Renders as a removable token (× suffix) instead of a plain selection. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Figma small pill chip — used for equipment tags, goal tags, active filters and
 * saved-exercise markers. 32dp tall, `pill` radius.
 */
export function Chip({ label, selected = false, onPress, icon, onRemove, style, testID }: Props) {
  const tint = selected ? colors.accent : colors.textSecondary;

  return (
    <View style={[styles.wrap, selected && styles.wrapSelected, style]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
        onPress={onPress}
        disabled={!onPress && !onRemove}
        hitSlop={4}
        style={styles.inner}
      >
        {icon ? <Feather name={icon} size={14} color={tint} /> : null}
        <Text variant="meta" color={selected ? colors.accent : colors.textSecondary}>
          {label}
        </Text>
      </Pressable>

      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          onPress={onRemove}
          hitSlop={8}
          style={styles.remove}
        >
          <Feather name="x" size={14} color={tint} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  wrapSelected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    height: 32,
  },
  remove: {
    paddingRight: spacing.md,
    paddingLeft: 2,
    height: 32,
    justifyContent: 'center',
  },
});