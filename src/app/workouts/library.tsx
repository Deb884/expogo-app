import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { TextField } from '@/components/ui/TextField';
import { Chip } from '@/components/ui/Chip';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconButton } from '@/components/ui/IconButton';
import { WorkoutCard } from '@/components/workouts/WorkoutCard';
import {
  WORKOUT_FILTERS,
  filterWorkouts,
  getCategory,
  type WorkoutFilter,
} from '@/data';
import { colors, spacing } from '@/constants/theme';

export default function WorkoutLibraryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<WorkoutFilter>('all');

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return filterWorkouts(filter).filter((workout) => {
      if (!needle) return true;
      const category = getCategory(workout.categoryId)?.name ?? '';
      return (
        workout.name.toLowerCase().includes(needle) ||
        workout.description.toLowerCase().includes(needle) ||
        category.toLowerCase().includes(needle)
      );
    });
  }, [filter, query]);

  const clear = () => {
    setQuery('');
    setFilter('all');
  };

  return (
    <Screen
      keyboardAware
      gap={spacing.md}
      topBar={
        <TopAppBar
          title="Workout Library"
          onBack={() => router.back()}
          right={
            <IconButton
              name="grid"
              accessibilityLabel="Browse by category"
              onPress={() => router.push('/workouts/categories')}
            />
          }
        />
      }
    >
      <TextField
        label="Search"
        value={query}
        onChangeText={setQuery}
        placeholder="Search workouts and exercises"
        autoCapitalize="none"
        returnKeyType="search"
        action={<Feather name="search" size={20} color={colors.textSecondary} />}
        onPressAction={() => setQuery('')}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {WORKOUT_FILTERS.map((option) => (
          <Chip
            key={option.id}
            label={option.label}
            selected={filter === option.id}
            onPress={() => setFilter(option.id)}
            testID={`library-filter-${option.id}`}
          />
        ))}
      </ScrollView>

      <Text variant="caption" color={colors.textSecondary}>
        {results.length} {results.length === 1 ? 'workout' : 'workouts'}
      </Text>

      {results.length === 0 ? (
        <EmptyState
          icon="search"
          title="Nothing found"
          body="No workouts match that search. Try a different term or clear your filters."
          actionLabel="Clear filters"
          onAction={clear}
          testID="library-empty"
        />
      ) : (
        <View style={styles.list}>
          {results.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => router.push(`/workouts/detail?id=${workout.id}`)}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { gap: spacing.sm, paddingRight: spacing.lg },
  list: { gap: spacing.md },
});