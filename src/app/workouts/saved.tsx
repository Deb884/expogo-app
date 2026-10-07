import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { EmptyState } from '@/components/ui/EmptyState';
import { Photo } from '@/components/ui/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkoutCard } from '@/components/workouts/WorkoutCard';
import { WorkoutRow } from '@/components/workouts/WorkoutRow';
import { images } from '@/assets/photos';
import { workoutsById, workouts } from '@/data';
import { useSavedIds } from '@/state/saved';
import { colors, radius, spacing } from '@/constants/theme';

export default function SavedWorkoutsScreen() {
  const router = useRouter();
  // Re-render whenever any save toggle changes.
  const ids = useSavedIds();

  const saved = ids
    .map((id) => workoutsById[id])
    .filter((workout) => workout !== undefined);

  const openWorkout = (id: string) => router.push(`/workouts/detail?id=${id}`);

  return (
    <Screen
      gap={spacing.lg}
      topBar={<TopAppBar title="Saved Workouts" onBack={() => router.back()} />}
    >
      {saved.length === 0 ? (
        <EmptyState
          icon="bookmark"
          title="No saved workouts"
          body="Tap the bookmark on any workout to keep it here for quick access."
          actionLabel="Browse library"
          onAction={() => router.push('/workouts/library')}
          testID="saved-empty"
        />
      ) : (
        <>
          <View style={styles.hero}>
            <Photo
              source={images.savedHero}
              width={342}
              height={200}
              borderRadius={0}
              accessibilityLabel="Saved workouts artwork"
            />
            <View style={styles.heroBody}>
              <Text variant="overline" color={colors.accent}>
                Your collection
              </Text>
              <Text variant="h3">
                {saved.length} saved {saved.length === 1 ? 'workout' : 'workouts'}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Recently saved" eyebrow="Latest" />
            <View style={styles.list}>
              {saved.map((workout) => (
                <WorkoutRow
                  key={workout.id}
                  workout={workout}
                  onPress={() => openWorkout(workout.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Suggested for you"
              eyebrow="Because you saved strength"
              action="Library"
              onAction={() => router.push('/workouts/library')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rail}
            >
              {workouts
                .filter((workout) => !saved.includes(workout))
                .slice(0, 4)
                .map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    width={248}
                    onPress={() => openWorkout(workout.id)}
                  />
                ))}
            </ScrollView>
          </View>

          <View style={styles.hint}>
            <Feather name="info" size={16} color={colors.textSecondary} />
            <Text variant="caption" color={colors.textSecondary} style={styles.hintCopy}>
              Saved workouts stay on this device and are available offline.
            </Text>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  heroBody: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.md,
    gap: 4,
    backgroundColor: 'rgba(2,3,1,0.86)',
  },
  section: { gap: spacing.md },
  list: { gap: spacing.sm },
  rail: { gap: spacing.md, paddingRight: spacing.lg },
  hint: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  hintCopy: { flex: 1 },
});