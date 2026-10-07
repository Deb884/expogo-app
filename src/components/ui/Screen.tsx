import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const MAX_CONTENT_WIDTH = 720;

type Props = {
  children: React.ReactNode;
  /** Pinned above the gesture area — typically the primary CTA. */
  bottom?: React.ReactNode;
  /** Rendered under the top safe area — typically a `TopAppBar`. */
  topBar?: React.ReactNode;
  /** Vertical rhythm inside the scroll area. Figma uses 24, or 16 when dense. */
  gap?: number;
  /** Set false for screens that manage their own scrolling (lists, carousels). */
  scroll?: boolean;
  /** Disable the standard page gutters (tab roots, full-bleed media). */
  fullBleed?: boolean;
  keyboardAware?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * The DIV screen contract, mirroring the Figma frame structure:
 *
 *   Screen
 *   ├── (top safe area)
 *   ├── TopAppBar?          72
 *   ├── Scroll viewport     flex: 1
 *   │   └── Scroll content  gap 24, padding 24
 *   ├── Fixed actions?      padding 16/24/16/24
 *   └── (bottom safe area)
 *
 * Fixed actions stay pinned while the middle scrolls, which is what the Figma
 * frames do on every CTA screen.
 *
 * The Figma artboards draw a fake status bar ("9:41" + signal glyphs) and a
 * gesture pill. Those are mockup chrome, so we use the real device insets
 * instead — the OS already renders that content (spec §21).
 */
export function Screen({
  children,
  bottom,
  topBar,
  gap = spacing.lg,
  scroll = true,
  fullBleed = false,
  keyboardAware = false,
  contentContainerStyle,
  style,
  testID,
}: Props) {
  const insets = useSafeAreaInsets();
  const { gutter } = useResponsive();

  const body = (
    <View style={[styles.flex, style]}>
      {topBar ? (
        <View style={[styles.contentFrame, fullBleed && styles.fullWidth]}>
          {topBar}
        </View>
      ) : null}

      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            fullBleed ? styles.fullWidth : styles.contentFrame,
            {
              gap,
              paddingHorizontal: fullBleed ? 0 : gutter,
              paddingTop: topBar ? spacing.md : spacing.lg,
            },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.flex,
            fullBleed ? styles.fullWidth : styles.contentFrame,
            !fullBleed && { paddingHorizontal: gutter },
          ]}
        >
          {children}
        </View>
      )}

      {bottom ? (
        <View
          style={[
            styles.fixedActions,
            { paddingHorizontal: fullBleed ? 0 : gutter },
          ]}
        >
          <View style={[styles.contentFrame, fullBleed && styles.fullWidth]}>
            {bottom}
          </View>
        </View>
      ) : null}
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {keyboardAware ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  contentFrame: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
  },
  fullWidth: { width: '100%' },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xl },
  fixedActions: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: 8,
    backgroundColor: colors.background,
  },
});
