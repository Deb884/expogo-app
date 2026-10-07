import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, layout } from '@/constants/theme';

/**
 * Figma progress bar: an 8dp `surfaceSunken` track with a rounded
 * `accent` fill (pill radius).
 */
export function ProgressBar({
  progress,
  style,
  trackColor = colors.surfaceSunken,
  fillColor = colors.accent,
}: {
  /** 0..1 */
  progress: number;
  style?: StyleProp<ViewStyle>;
  trackColor?: string;
  fillColor?: string;
}) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));

  return (
    <View style={[styles.track, { backgroundColor: trackColor }, style]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: fillColor },
        ]}
      />
    </View>
  );
}

/**
 * Figma "Onboarding progress": three 8dp-tall dots where the active one
 * stretches to 32dp. Used for the three onboarding steps.
 */
export function ProgressDots({
  total,
  index,
  style,
}: {
  total: number;
  index: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.dots, style]}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === index ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: layout.progressTrack,
    borderRadius: radius.pill,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: layout.dot,
    borderRadius: radius.md,
  },
  dotActive: {
    width: layout.dotActiveWidth,
    backgroundColor: colors.accent,
  },
  dotInactive: {
    width: layout.dot,
    backgroundColor: colors.borderStrong,
  },
});
