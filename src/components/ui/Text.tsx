import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { type, TypographyToken } from '@/constants/typography';
import { colors } from '@/constants/colors';

type Props = TextProps & {
  /** Typography token from the DIV type scale. */
  variant: TypographyToken;
  /** Override the token colour (e.g. accent links). */
  color?: string;
  /** Shorthand for `textAlign`. */
  align?: TextStyle['textAlign'];
  style?: TextStyle | TextStyle[];
};

/**
 * Typography-aware Text. Keeps every string on the Inter scale extracted from
 * Figma instead of ad-hoc font sizes.
 */
export function Text({ variant, color, align, style, ...rest }: Props) {
  return (
    <RNText
      {...rest}
      style={[
        type(variant),
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
    />
  );
}

/** Small uppercase eyebrow used above sections. */
export function Overline({ children, color = colors.accent, style }: { children: React.ReactNode; color?: string; style?: TextStyle }) {
  return (
    <RNText style={[type('overline'), { color, textTransform: 'uppercase' }, style]}>
      {children}
    </RNText>
  );
}

export const textStyles = StyleSheet.create({
  flex: { flex: 1 },
});
