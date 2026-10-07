import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { Text, Overline } from './Text';

type Props = {
  title: string;
  /** Small uppercase eyebrow rendered above the title. */
  eyebrow?: string;
  /** Trailing inline link, e.g. "See all". */
  action?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * Section heading with an optional accent eyebrow and trailing link. Keeps
 * vertical rhythm consistent between every scrollable screen (24dp gap).
 */
export function SectionHeader({ title, eyebrow, action, onAction, style }: Props) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.copy}>
        {eyebrow ? <Overline>{eyebrow}</Overline> : null}
        <Text variant="h3" numberOfLines={2}>
          {title}
        </Text>
      </View>

      {action ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action}
          onPress={onAction}
          hitSlop={8}
          style={styles.action}
        >
          <Text variant="label" color={colors.accent} numberOfLines={1}>
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  copy: { flex: 1, gap: 4 },
  action: { paddingVertical: 4 },
});