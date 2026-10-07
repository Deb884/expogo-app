import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { IconButton } from '@/components/ui/IconButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { images } from '@/assets/photos';
import { profile } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

const DEFAULT_SECONDS = 90;
const RING_SIZE = 220;

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function RestTimerScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const adjust = useCallback((delta: number) => {
    setSeconds((prev) => Math.max(0, Math.min(600, prev + delta)));
  }, []);

  const progress = seconds / DEFAULT_SECONDS;

  return (
    <Screen
      gap={spacing.lg}
      topBar={
        <View style={styles.header}>
          <IconButton
            name="x"
            accessibilityLabel="Close rest timer"
            onPress={() => router.back()}
          />
          <View style={styles.headerCopy}>
            <Text variant="h2" align="center">
              Rest
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
      }
      bottom={
        <Button
          label="Skip Rest"
          onPress={() => router.back()}
          testID="rest-skip"
        />
      }
    >
      <View style={styles.ringBlock}>
        <ProgressRing progress={progress} size={RING_SIZE} strokeWidth={12}>
          <Text variant="stat" style={styles.timer} accessibilityLabel={format(seconds)}>
            {format(seconds)}
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            remaining
          </Text>
        </ProgressRing>
      </View>

      <View style={styles.adjust}>
        <IconButton
          name="minus"
          accessibilityLabel="Remove fifteen seconds"
          onPress={() => adjust(-15)}
        />
        <Text variant="body" color={colors.textSecondary}>
          {seconds === 0 ? 'Ready for the next set' : 'Breathe and reset'}
        </Text>
        <IconButton
          name="plus"
          accessibilityLabel="Add fifteen seconds"
          onPress={() => adjust(15)}
        />
      </View>

      <Card style={styles.next}>
        <View style={styles.avatar}>
          <Photo
            source={images[profile.avatar]}
            width={44}
            height={44}
            borderRadius={radius.pill}
            accessibilityLabel={`${profile.firstName}'s avatar`}
          />
        </View>

        <View style={styles.nextCopy}>
          <Text variant="overline" color={colors.accent}>
            Up next
          </Text>
          <Text variant="titleMd" numberOfLines={1}>
            Barbell Squat
          </Text>
          <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
            Set 3 of 4 · 8 reps
          </Text>
        </View>

        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      </Card>

      <Card style={styles.tip}>
        <Feather name="info" size={16} color={colors.accent} />
        <Text variant="caption" color={colors.textSecondary} style={styles.tipCopy}>
          Keep moving gently between sets. It keeps your heart rate up and your
          next set stronger.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerCopy: { flex: 1 },
  headerSpacer: { width: 48 },
  ringBlock: { alignItems: 'center', paddingVertical: spacing.md },
  timer: { fontSize: 46, lineHeight: 54 },
  adjust: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  next: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 44 },
  nextCopy: { flex: 1, gap: 2 },
  tip: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  tipCopy: { flex: 1 },
});