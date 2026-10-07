import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { ProgressDots } from '@/components/ui/Progress';
import { images } from '@/assets/photos';
import { colors, spacing } from '@/constants/theme';

/** The three Figma "Onboarding" artboards. */
const STEPS: {
  key: string;
  headline: string;
  body: string;
  image: ImageSourcePropType;
}[] = [
  {
    key: 'onboarding1',
    headline: 'Train smarter.',
    body: 'Build a fitness routine designed around your goals, schedule, and lifestyle.',
    image: images.onboarding1,
  },
  {
    key: 'onboarding2',
    headline: 'Your plan. Your pace.',
    body: 'Follow personalized workouts that adapt to your progress.',
    image: images.onboarding2,
  },
  {
    key: 'onboarding3',
    headline: 'Become stronger.',
    body: 'Track every workout and see how far you’ve come.',
    image: images.onboarding3,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  const next = useCallback(() => {
    if (index < STEPS.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    router.replace('/login');
  }, [index, router]);

  const skip = useCallback(() => router.replace('/login'), [router]);

  return (
    <Screen
      gap={spacing.md}
      keyboardAware
      bottom={
        <View style={styles.actions}>
          <ProgressDots total={STEPS.length} index={index} />
          <Button label="Get Started" onPress={next} testID="onboarding-next" />
          <Pressable
            accessibilityRole="button"
            onPress={skip}
            style={styles.skip}
            hitSlop={8}
          >
            <Text variant="body" color={colors.textSecondary} align="center">
              Skip
            </Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.brand}>
        <Text variant="wordmarkMd">DIV</Text>
      </View>

      <Photo
        source={step.image}
        width={342}
        height={288}
        borderRadius={24}
        accessibilityLabel={`Onboarding artwork: ${step.headline}`}
      />

      <View style={styles.copy}>
        <Text variant="display">{step.headline}</Text>
        <Text variant="body" color={colors.textSecondary}>
          {step.body}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center' },
  copy: { gap: spacing.md, marginTop: spacing.xs },
  actions: { gap: spacing.md },
  skip: { height: 48, justifyContent: 'center' },
});
