import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius } from '@/constants/theme';
import { Text } from './Text';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Trailing content. Defaults to a chevron when `onPress` is supplied. */
  trailing?: React.ReactNode;
  /** When true no chevron is drawn — use with an explicit `trailing`. */
  hideChevron?: boolean;
  onPress?: () => void;
  /** Destructive rows use the `danger` tone for the title. */
  tone?: 'default' | 'danger';
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const LIST_ROW_HEIGHT = 56;

/**
 * Figma settings/profile list row — 56dp minimum, 12dp icon, 16/400 title and
 * 13/400 secondary line, with an optional trailing control.
 */
export function ListRow({
  title,
  subtitle,
  icon,
  trailing,
  hideChevron,
  onPress,
  tone = 'default',
  style,
  testID,
}: Props) {
  const titleColor = tone === 'danger' ? colors.danger : colors.textPrimary;

  const body = (
    <>
      {icon ? (
        <View style={styles.icon}>
          <Feather name={icon} size={20} color={titleColor} />
        </View>
      ) : null}

      <View style={styles.copy}>
        <Text variant="body" color={titleColor} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {trailing ??
        (onPress && !hideChevron ? (
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        ) : null)}
    </>
  );

  if (!onPress) {
    return (
      <View style={[styles.row, style]} testID={testID}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed, style]}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: LIST_ROW_HEIGHT,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: radius.sm,
  },
  pressed: { backgroundColor: colors.surfaceSunken },
  icon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  copy: { flex: 1, gap: 2 },
});