import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/constants/theme';
import { Text } from './Text';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  value: string;
  label: string;
  icon?: IconName;
  /** Secondary line under the label (e.g. "+12% this month"). */
  hint?: string;
  /** `flex: 1` by default so tiles sit in an even row. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Figma stat tile — 26/700 numeral over a 12/400 caption on a `surface` block.
 * Used on Home, Profile, Progress and Workout Complete.
 */
export function StatTile({ value, label, icon, hint, style, testID }: Props) {
  return (
    <View style={[styles.tile, style]} testID={testID}>
      {icon ? <Feather name={icon} size={18} color={colors.accent} /> : null}
      <Text variant="stat" numberOfLines={1}>
        {value}
      </Text>
      <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
        {label}
      </Text>
      {hint ? (
        <Text variant="caption" color={colors.accentSoft} numberOfLines={1}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    gap: 4,
    padding: spacing.md,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
});