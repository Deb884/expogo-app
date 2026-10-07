import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { ProgressBar } from '@/components/ui/Progress';
import type { Achievement } from '@/data/types';

type Props = {
  achievement: Achievement;
  /** Fixed width when used in a rail; omit to fill the parent. */
  width?: number;
  onPress?: () => void;
  /** Compact rails drop the description. */
  compact?: boolean;
  testID?: string;
};

/**
 * Figma achievement badge — a pill tile carrying the glyph, the title and either
 * the unlock date or a partial-progress bar for locked badges.
 */
export function AchievementBadge({
  achievement,
  width,
  onPress,
  compact = false,
  testID,
}: Props) {
  const { unlocked, progress = 0, icon, title, description, unlockedLabel } = achievement;

  const body = (
    <>
      <View style={[styles.tile, unlocked && styles.tileUnlocked]}>
        <Feather
          name={unlocked ? icon : 'lock'}
          size={compact ? 22 : 26}
          color={unlocked ? colors.onAccent : colors.textSecondary}
        />
      </View>

      <View style={styles.copy}>
        <Text variant="meta" color={colors.textPrimary} numberOfLines={2}>
          {title}
        </Text>

        {compact ? null : (
          <Text variant="caption" color={colors.textSecondary} numberOfLines={2}>
            {description}
          </Text>
        )}

        {unlocked ? (
          unlockedLabel ? (
            <Text variant="caption" color={colors.accentSoft} numberOfLines={1}>
              {unlockedLabel}
            </Text>
          ) : null
        ) : (
          <View style={styles.locked}>
            <ProgressBar progress={progress} style={styles.progress} />
            <Text variant="caption" color={colors.textSecondary}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        )}
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View style={[styles.row, width ? { width } : undefined]} testID={testID}>
        {body}
      </View>
    );
  }

  return (
    <Card onPress={onPress} style={[styles.row, width ? { width } : undefined]} testID={testID}>
      {body}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  tile: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileUnlocked: { backgroundColor: colors.accent },
  copy: { flex: 1, gap: 3 },
  locked: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  progress: { flex: 1 },
});