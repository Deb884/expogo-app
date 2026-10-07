import { useWindowDimensions } from 'react-native';
import { gutterFor, scaleFor } from '@/constants/theme';

/**
 * Responsive metrics for a screen.
 *
 * Figma ships a single 390x844 artboard, so horizontal padding is derived from
 * the live viewport instead of hard-coded pixel offsets (spec §6).
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();
  return {
    width,
    height,
    gutter: gutterFor(width),
    scale: scaleFor(width),
    /** Content width inside the gutters — pass to cards so they never overflow. */
    contentWidth: Math.max(0, width - gutterFor(width) * 2),
    /** True on short devices where fixed bottom actions need extra care. */
    isShort: height < 700,
    isWide: width >= 600,
  };
}
