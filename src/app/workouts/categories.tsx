import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/ui/Screen';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { images } from '@/assets/photos';
import { categories, workoutsForCategory } from '@/data';
import { colors, radius, spacing } from '@/constants/theme';

export default function WorkoutCategoriesScreen() {
  const router = useRouter();

  return (
    <Screen
      gap={spacing.md}
      topBar={
        <TopAppBar title="Categories" onBack={() => router.back()} />
      }
    >
      <Text variant="body" color={colors.textSecondary}>
        Browse the library by training style.
      </Text>

      <View style={styles.grid}>
        {categories.map((category) => {
          const count = workoutsForCategory(category.id).length;

          return (
            <Card
              key={category.id}
              flush
              onPress={() => router.push(`/workouts/library?category=${category.id}`)}
              style={styles.tile}
              accessibilityLabel={`${category.name}, ${count} workouts`}
              testID={`category-${category.id}`}
            >
              <Photo
                source={images[category.image]}
                width={158}
                height={158}
                borderRadius={0}
                accessibilityLabel={`${category.name} artwork`}
              />
              <View style={styles.body}>
                <Text variant="titleMd" numberOfLines={1}>
                  {category.name}
                </Text>
                <View style={styles.meta}>
                  <Text variant="caption" color={colors.textSecondary}>
                    {count} {count === 1 ? 'workout' : 'workouts'}
                  </Text>
                  <Feather name="chevron-right" size={14} color={colors.textSecondary} />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  // Two-up grid that keeps tiles even on narrow and wide phones.
  tile: { flexGrow: 1, flexBasis: '46%', maxWidth: '48%', borderRadius: radius.card },
  body: { padding: 12, gap: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});