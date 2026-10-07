/**
 * DIV color tokens.
 * Values extracted verbatim from the Figma file (page "03 - Android Application").
 * Do not invent or shift these — they are the visual source of truth.
 */

export const colors = {
  /** Screen background */
  background: '#020301',

  /** Inputs, secondary buttons, icon buttons */
  surface: '#0E1805',

  /** Progress track, bottom-nav hairline, illustration tile */
  surfaceSunken: '#182D09',

  /** Primary accent — buttons, active nav, progress fill, links */
  accent: '#6FD029',

  /** Accent pressed state */
  accentPressed: '#82D944',

  /** Success / password-strength copy */
  accentSoft: '#BDEB9D',

  /** Selected card background */
  accentMuted: '#21420D',

  /** Card + bottom-nav hairline border */
  borderSubtle: '#182D09',

  /** Input border, disabled progress dots, checkbox */
  borderStrong: '#305711',

  /** Headings, values */
  textPrimary: '#FFFFFF',

  /** Body copy, captions, gesture handle */
  textSecondary: '#B7C0B0',

  /** Error message */
  danger: '#D89C82',

  /** Text/icon rendered on top of `accent` */
  onAccent: '#020301',

  /** Divider on dark surfaces */
  divider: '#182D09',
} as const;

export type ColorToken = keyof typeof colors;
