import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

/**
 * Figma "Atmospheric glow" — a soft radial wash behind the splash wordmark.
 * Reproduced with an SVG radial gradient since `expo-linear-gradient` only
 * renders linear ramps.
 */
export function Glow({
  height,
  color = colors.accent,
  opacity = 0.22,
  style,
}: {
  height: number;
  color?: string;
  opacity?: number;
  style?: object;
}) {
  return (
    <View pointerEvents="none" style={[styles.wrap, { height }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="divGlow" cx="50%" cy="42%" rx="70%" ry="60%">
            <Stop offset="0" stopColor={color} stopOpacity={opacity} />
            <Stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.28} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#divGlow)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
});
