import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Progress';
import { Glow } from '@/components/ui/Glow';
import { colors, radius, spacing } from '@/constants/theme';

/** Ordered build phases shown as they complete. */
const PHASES = [
  'Reading your goal and level',
  'Matching available equipment',
  'Balancing muscle groups',
  'Fitting your weekly schedule',
  'Ordering the first four weeks',
];

const DONE_AFTER_MS = 620;

export default function PlanGeneratingScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  const spin = useMemo(() => new Animated.Value(0), []);

  // Rotating ring — a plain loop, no extra animation dependency.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  // Advance the phase list, then hand off to Plan Ready.
  useEffect(() => {
    if (phase >= PHASES.length) {
      router.replace('/personalization/ready');
      return;
    }

    const timer = setTimeout(
      () => setPhase((prev) => prev + 1),
      DONE_AFTER_MS
    );
    return () => clearTimeout(timer);
  }, [phase, router]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const ratio = Math.min(phase / PHASES.length, 1);

  return (
    <Screen gap={spacing.lg}>
      <Glow height={260} opacity={0.28} />

      <View style={styles.stage}>
        <Animated.View
          style={[
            styles.spinner,
            { transform: [{ rotate }] },
          ]}
          testID="generating-spinner"
        >
          <Feather name="loader" size={40} color={colors.accent} />
        </Animated.View>

        <Text variant="h1" align="center">
          Building your plan
        </Text>
        <Text variant="bodyCenter">
          Matching your goal, level, equipment and schedule into four weeks of
          training.
        </Text>
      </View>

      <View style={styles.progressBlock}>
        <ProgressBar progress={ratio} />
        <View style={styles.progressLabels}>
          <Text variant="caption" color={colors.textSecondary}>
            {Math.round(ratio * 100)}%
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            Step {Math.min(phase + 1, PHASES.length)} of {PHASES.length}
          </Text>
        </View>
      </View>

      <View style={styles.phases}>
        {PHASES.map((label, index) => {
          const done = index < phase;
          const active = index === phase;

          return (
            <View key={label} style={styles.phase}>
              <View style={[styles.dot, done && styles.dotDone]}>
                <Feather
                  name={done ? 'check' : active ? 'loader' : 'minus'}
                  size={13}
                  color={done ? colors.onAccent : colors.textSecondary}
                />
              </View>
              <Text
                variant="body"
                color={
                  done || active ? colors.textPrimary : colors.textSecondary
                }
                style={styles.phaseCopy}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button
          label="Cancel"
          variant="secondary"
          onPress={() => router.back()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stage: { alignItems: 'center', gap: spacing.md },
  spinner: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBlock: { gap: spacing.sm },
  progressLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phases: { gap: spacing.md },
  phase: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: colors.accent },
  phaseCopy: { flex: 1 },
  footer: { flex: 1, justifyContent: 'flex-end' },
});