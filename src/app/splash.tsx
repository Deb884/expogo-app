import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Glow } from '@/components/ui/Glow';
import { colors, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

/** Time the brand holds before handing off, in ms. */
const HOLD_MS = 1800;

export default function SplashScreen() {
  const router = useRouter();
  const { height, scale } = useResponsive();
  // Created lazily via useMemo so the value is not a ref read during render.
  const fade = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    // Figma specifies no animation, so keep it to a single restrained fade.
    Animated.timing(fade, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, [fade, router]);

  // The Figma wordmark is 88/107 at a 390pt width. Scale it down on short or
  // narrow devices so it can never clip.
  const wordmarkScale = Math.min(1, Math.max(0.68, scale * (height < 700 ? 0.82 : 1)));

  return (
    <Screen scroll={false} fullBleed>
      <View style={styles.stage}>
        {/* Single justified absolute layer: the Figma glow sits behind the wordmark. */}
        <Glow
          height={Math.min(560, height * 0.7)}
          opacity={0.24}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[styles.center, { opacity: fade, paddingHorizontal: spacing.lg }]}
        >
          <Text
            variant="wordmarkXl"
            style={{ transform: [{ scale: wordmarkScale }] }}
          >
            DIV
          </Text>

          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.tagline}
          >
            Move with purpose.
          </Text>

          <Text variant="caption" align="center" style={styles.footer}>
            YOUR PERSONAL FITNESS SYSTEM
          </Text>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { alignItems: 'center', width: '100%' },
  tagline: { marginTop: spacing.md },
  footer: { marginTop: spacing.xl, maxWidth: 280 },
});
