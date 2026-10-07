import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, layout } from '@/constants/theme';

type Props = {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Loading placeholder block — a flat `surfaceSunken` bar at 5dp radius, matching
 * the Figma skeleton spec. Backs "Workout Loading" and "Profile Loading".
 */
export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = radius.sm,
  style,
  testID,
}: Props) {
  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[
        styles.block,
        { width, height, borderRadius, backgroundColor: colors.surfaceSunken },
        style,
      ]}
    />
  );
}

/** Avatar-shaped placeholder for the profile loading state. */
export function SkeletonAvatar({ size = 96 }: { size?: number }) {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={radius.pill}
      testID="skeleton-avatar"
    />
  );
}

/** Card-shaped placeholder that mirrors a media card's proportions. */
export function SkeletonCard({ width, height = 180 }: { width?: number; height?: number }) {
  return (
    <View style={[styles.card, { width: width ?? '100%' }]}>
      <Skeleton height={height} borderRadius={radius.card} />
      <View style={styles.cardBody}>
        <Skeleton width="72%" height={18} />
        <Skeleton width="45%" height={13} />
      </View>
    </View>
  );
}

/** Two-line text placeholder used inside list rows. */
export function SkeletonLines({ lines = 2 }: { lines?: number }) {
  return (
    <View style={styles.lines}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={i === 0 ? 16 : 12}
          width={i === 0 ? '68%' : '44%'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { opacity: 0.85 },
  card: { gap: 12 },
  cardBody: { gap: 8, paddingTop: 4 },
  lines: { gap: 8, minHeight: layout.control, justifyContent: 'center' },
});