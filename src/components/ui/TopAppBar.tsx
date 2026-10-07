import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { layout } from '@/constants/theme';
import { Text } from './Text';
import { IconButton } from './IconButton';

type Props = {
  title: string;
  onBack?: () => void;
  /** Rendered at the trailing edge (e.g. settings, overflow). */
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Figma "Top app bar": 72dp tall, 16dp horizontal padding, vertically centred,
 * with an optional 48dp back chip and a growing title block.
 */
export function TopAppBar({ title, onBack, right, style }: Props) {
  return (
    <View style={[styles.bar, style]}>
      {onBack ? (
        <IconButton name="arrow-left" onPress={onBack} accessibilityLabel="Go back" />
      ) : null}

      <View style={styles.heading}>
        <Text variant="h2" numberOfLines={1}>
          {title}
        </Text>
      </View>

      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: layout.topAppBar,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  heading: { flex: 1, justifyContent: 'center' },
});
