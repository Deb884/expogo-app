/**
 * DIV typography — Inter.
 * Every size/weight/line-height/letter-spacing below was read directly out of
 * the Figma text layers (see docs/figma-design-system.md).
 */
import { colors } from './colors';
import { TextStyle } from 'react-native';

/**
 * Inter families provided by @expo-google-fonts/inter, keyed by numeric weight.
 * Loaded once at app start (see src/app/_layout.tsx).
 */
export const fontFamily = {
  400: 'Inter_400Regular',
  500: 'Inter_500Medium',
  600: 'Inter_600SemiBold',
  700: 'Inter_700Bold',
  800: 'Inter_800ExtraBold',
  900: 'Inter_900Black',
} as const;

export type FontWeight = keyof typeof fontFamily;

type Variant = {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeight;
  letterSpacing?: number;
  color?: string;
  textAlign?: TextStyle['textAlign'];
};

export const typography = {
  /** Splash wordmark — 88/900/107, tracking -5.72 */
  wordmarkXl: { fontSize: 88, lineHeight: 107, fontWeight: 900, letterSpacing: -5.72, color: colors.textPrimary },
  /** Auth wordmark — 48/900/58, tracking -3.12 */
  wordmarkLg: { fontSize: 48, lineHeight: 58, fontWeight: 900, letterSpacing: -3.12, color: colors.textPrimary },
  /** In-header wordmark — 32/900/39, tracking -2.08 */
  wordmarkMd: { fontSize: 32, lineHeight: 39, fontWeight: 900, letterSpacing: -2.08, color: colors.textPrimary },

  /** Onboarding headline — 36/700/49 */
  display: { fontSize: 36, lineHeight: 49, fontWeight: 700, color: colors.textPrimary },
  /** "Welcome back." — 32/700/43 */
  h1: { fontSize: 32, lineHeight: 43, fontWeight: 700, color: colors.textPrimary },
  /** Top app bar title — 28/700/34 */
  h2: { fontSize: 28, lineHeight: 34, fontWeight: 700, color: colors.textPrimary },
  /** Empty-state title — 28/700/38, centered */
  h2Center: { fontSize: 28, lineHeight: 38, fontWeight: 700, color: colors.textPrimary, textAlign: 'center' },
  /** Section heading — 24/700/29 */
  h3: { fontSize: 24, lineHeight: 29, fontWeight: 700, color: colors.textPrimary },
  /** Screen headline — 26/700/31 */
  h3Tight: { fontSize: 26, lineHeight: 31, fontWeight: 700, color: colors.textPrimary },

  /** Card headline — 20/400/27 */
  titleLg: { fontSize: 20, lineHeight: 27, fontWeight: 400, color: colors.textPrimary },
  /** Card headline emphasised — 20/600/27 */
  titleMd: { fontSize: 20, lineHeight: 27, fontWeight: 600, color: colors.textPrimary },
  /** Stat numerals — 26/700/35 */
  stat: { fontSize: 26, lineHeight: 35, fontWeight: 700, color: colors.textPrimary },

  /** Body copy + input values — 16/400/22 */
  body: { fontSize: 16, lineHeight: 22, fontWeight: 400, color: colors.textPrimary },
  /** Button labels — 16/700/19 */
  button: { fontSize: 16, lineHeight: 19, fontWeight: 700, color: colors.onAccent },
  /** Centered supporting copy — 15/400/20 */
  bodyCenter: { fontSize: 15, lineHeight: 20, fontWeight: 400, color: colors.textSecondary, textAlign: 'center' },
  /** Links / secondary actions — 14/400/19 */
  label: { fontSize: 14, lineHeight: 19, fontWeight: 400, color: colors.textSecondary },
  /** Workout metadata — 13/400/18 */
  meta: { fontSize: 13, lineHeight: 18, fontWeight: 400, color: colors.textSecondary },
  /** Captions, legal — 12/400/16 */
  caption: { fontSize: 12, lineHeight: 16, fontWeight: 400, color: colors.textSecondary },
  /** Input field labels — 12/500/15 */
  fieldLabel: { fontSize: 12, lineHeight: 15, fontWeight: 500, color: colors.textSecondary },
  /** Eyebrows / "OR" — 12/700/16 */
  overline: { fontSize: 12, lineHeight: 16, fontWeight: 700, color: colors.textSecondary },
  /** Status-bar clock — 12/600/15 */
  statusBar: { fontSize: 12, lineHeight: 15, fontWeight: 600, color: colors.textPrimary },
  /** Bottom-nav active label — 12/600/15 */
  navActive: { fontSize: 12, lineHeight: 15, fontWeight: 600, color: colors.accent },
  /** Bottom-nav inactive label — 12/400/15 */
  navInactive: { fontSize: 12, lineHeight: 15, fontWeight: 400, color: colors.textSecondary },
} as const;

export type TypographyToken = keyof typeof typography;

/** Turn a typography token into a React Native style object. */
export function type(token: TypographyToken): TextStyle {
  const v = typography[token] as Variant;
  return {
    fontFamily: fontFamily[v.fontWeight],
    fontSize: v.fontSize,
    lineHeight: v.lineHeight,
    letterSpacing: v.letterSpacing ?? 0,
    color: v.color ?? colors.textPrimary,
    ...(v.textAlign ? { textAlign: v.textAlign } : null),
  };
}
