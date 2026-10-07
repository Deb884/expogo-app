import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { Text } from './Text';
import { Button } from './Button';

type IconName = React.ComponentProps<typeof Feather>['name'];

type Props = {
  icon: IconName;
  title: string;
  body: string;
  /** Optional pinned CTA. */
  actionLabel?: string;
  onAction?: () => void;
  /** Optional secondary line under the CTA (e.g. an error hint). */
  footnote?: string;
  testID?: string;
};

/**
 * Figma empty / error state: a 112x112 `surfaceSunken` tile at 32dp radius
 * holding a 2dp-stroke glyph, a centred 28/700 title and centred supporting
 * copy. Backs "Empty Saved Workouts", "Empty Progress",
 * "Empty Notifications" and "Network Error".
 *
 * The Figma artboards use illustrated artwork in the tile; the exported asset set
 * does not include those nodes, so the tile keeps its exact box, radius and
 * colour role and carries a Feather glyph instead (spec §13).
 */
export function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  footnote,
  testID,
}: Props) {
  return (
    <View style={styles.root} testID={testID}>
      <View style={styles.tile}>
        <Feather name={icon} size={44} color={colors.accent} />
      </View>

      <View style={styles.copy}>
        <Text variant="h2Center">{title}</Text>
        <Text variant="bodyCenter">{body}</Text>
      </View>

      {actionLabel ? (
        <View style={styles.action}>
          <Button label={actionLabel} onPress={onAction} />
        </View>
      ) : null}

      {footnote ? (
        <Text variant="caption" color={colors.textSecondary} align="center">
          {footnote}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  tile: {
    width: layout.illustration,
    height: layout.illustration,
    borderRadius: radius.illustration,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { gap: spacing.sm, maxWidth: 320 },
  action: { alignSelf: 'stretch', paddingHorizontal: spacing.lg },
});