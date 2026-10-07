import React from 'react';
import { Image, ImageSourcePropType, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { radius, colors } from '@/constants/theme';

type Props = {
  source: ImageSourcePropType;
  /** Intrinsic Figma box — used as the aspect ratio so layout never shifts. */
  width: number;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/**
 * Figma image-fill frame. Every photo node in the design uses `scaleMode: FILL`
 * inside a fixed-size, rounded box, so we render it as `cover` and lock the
 * aspect ratio from the design dimensions.
 */
export function Photo({ source, width, height, borderRadius = radius.card, style, accessibilityLabel }: Props) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.frame,
        {
          width: '100%',
          aspectRatio: width / height,
          borderRadius,
          backgroundColor: colors.surfaceSunken,
        },
        style,
      ]}
    >
      <Image source={source} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
});
