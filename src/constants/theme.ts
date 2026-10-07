import { colors } from './colors';
import { radius, spacing, layout, REFERENCE_WIDTH } from './spacing';
import { typography, type, fontFamily } from './typography';

export { colors, radius, spacing, layout, REFERENCE_WIDTH, typography, type, fontFamily };

/**
 * Horizontal page padding.
 * Figma uses 24 at its 390dp reference width; it tightens slightly on narrow
 * phones and is capped on wide ones so content never stretches edge to edge.
 */
export function gutterFor(width: number): number {
  if (width < 360) return 20;
  if (width <= 412) return 24;
  return 28;
}

/** Scale factor against the 390dp Figma reference — used for subtle scaling only. */
export function scaleFor(width: number): number {
  return Math.min(1.12, Math.max(0.92, width / REFERENCE_WIDTH));
}

export const theme = { colors, radius, spacing, layout, typography } as const;
