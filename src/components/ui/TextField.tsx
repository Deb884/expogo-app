import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius, layout } from '@/constants/theme';
import { Text } from './Text';

type Props = Omit<TextInputProps, 'style'> & {
  label: string;
  /** Rendered at the trailing edge of the control (e.g. show/hide password). */
  action?: React.ReactNode;
  onPressAction?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  /** Applied to the inner `TextInput`; use with `multiline` for tall fields. */
  style?: StyleProp<TextStyle>;
  /** Message shown under the control; switches the border to `danger`. */
  error?: string;
};

/**
 * DIV text field — 12/500 label above a 56dp control with a
 * `borderStrong` hairline on `surface`. Passing `multiline` grows the control
 * to a 96dp textarea with top-aligned text.
 */
export function TextField({
  label,
  action,
  onPressAction,
  containerStyle,
  style,
  error,
  multiline,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={containerStyle}>
      <Text variant="fieldLabel" style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          styles.control,
          multiline && styles.controlMultiline,
          focused && styles.controlFocused,
          !!error && styles.controlError,
        ]}
      >
        <TextInput
          {...rest}
          multiline={multiline}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          style={[styles.input, multiline && styles.inputMultiline, style]}
        />

        {action ? (
          <Pressable
            accessibilityRole="button"
            onPress={onPressAction}
            hitSlop={6}
            style={styles.action}
          >
            {action}
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text variant="caption" color={colors.danger} style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 8 },
  control: {
    height: layout.control,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  controlFocused: { borderColor: colors.accent },
  controlError: { borderColor: colors.danger },
  controlMultiline: {
    height: undefined,
    minHeight: 96,
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
    padding: 0,
    // Web-only nicety; harmless on native.
    ...(({ outlineStyle: 'none' } as unknown) as object),
  },
  inputMultiline: { textAlignVertical: 'top' },
  action: {
    width: 32,
    height: layout.tapTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
  },
  error: { marginTop: 6 },
});
