/**
 * DIV radii, spacing and layout metrics.
 * Extracted from Figma — see docs/figma-design-system.md.
 */

export const radius = {
  /** Gesture handle */
  xs: 2,
  /** Skeletons, small chips */
  sm: 5,
  /** Progress dots */
  md: 8,
  /** Selected date cell */
  lg: 12,
  /** Cards, inputs, buttons, photography */
  card: 16,
  /** Selectable cards */
  selectable: 18,
  /** Empty-state illustration tile (112x112) */
  illustration: 32,
  /** Progress bars, toggles, avatars */
  pill: 100,
} as const;

/** Vertical rhythm between stacked blocks. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Fixed chrome heights measured from the Figma frames.
 * Content area = viewport - statusBar - (topAppBar?) - bottomNav - gestureArea
 */
export const layout = {
  statusBar: 32,
  topAppBar: 72,
  gestureArea: 24,
  /** Standard control height (buttons, inputs) */
  control: 56,
  /** Small square tap target */
  tapTarget: 48,
  iconButton: 48,
  /** Empty-state illustration tile */
  illustration: 112,
  /** Onboarding / segmented progress dot */
  dot: 8,
  dotActiveWidth: 32,
  /** Track height for progress bars */
  progressTrack: 8,
  gestureHandle: { width: 104, height: 4 },
  bottomNav: 80,
} as const;

/** Figma reference viewport — used for responsive scaling decisions. */
export const REFERENCE_WIDTH = 390;
