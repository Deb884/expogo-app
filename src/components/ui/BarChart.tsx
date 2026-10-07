import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';
import { Text } from './Text';

export type BarDatum = {
  label: string;
  value: number;
  /** Highlights the bar (today / selected day). */
  active?: boolean;
};

type Props = {
  data: BarDatum[];
  /** Fixed plot height so the card does not resize between ranges. */
  height?: number;
  /** Formats the tooltip/axis value. Defaults to the raw number. */
  formatValue?: (value: number) => string;
  onSelect?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const TRACK = 8;

/**
 * Weekly volume chart for Progress and Statistics. Drawn with plain views —
 * the design's bar chart is a flat set of pill-topped columns, so no chart
 * library is needed (spec §19).
 */
export function BarChart({
  data,
  height = 140,
  formatValue,
  onSelect,
  style,
  testID,
}: Props) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <View style={[styles.chart, { height: height + 20 }, style]} testID={testID}>
      {data.map((datum, index) => {
        const ratio = datum.value / max;
        const column = (
          <View style={styles.column} key={`${datum.label}-${index}`}>
            {formatValue ? (
              <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
                {formatValue(datum.value)}
              </Text>
            ) : null}

            <View style={[styles.plot, { height }]}>
              {/* Ghost track keeps the plot baseline legible at low values. */}
              <View style={styles.track} />
              <View
                style={[
                  styles.bar,
                  {
                    height: `${Math.max(ratio * 100, datum.value > 0 ? 6 : 2)}%`,
                    backgroundColor: datum.active ? colors.accent : colors.surfaceSunken,
                  },
                ]}
              />
            </View>

            <Text
              variant="caption"
              color={datum.active ? colors.accent : colors.textSecondary}
              numberOfLines={1}
            >
              {datum.label}
            </Text>
          </View>
        );

        if (!onSelect) return column;

        return (
          <View
            key={`hit-${datum.label}-${index}`}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`${datum.label}: ${datum.value}`}
            onTouchEnd={() => onSelect(index)}
            style={styles.hit}
          >
            {column}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  hit: { flex: 1 },
  column: { flex: 1, alignItems: 'center', gap: 6 },
  plot: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  track: {
    position: 'absolute',
    bottom: 0,
    height: TRACK,
    width: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.divider,
  },
  bar: {
    width: '68%',
    borderTopLeftRadius: radius.pill,
    borderTopRightRadius: radius.pill,
    minHeight: 2,
  },
});