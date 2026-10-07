import { images } from '@/assets/photos';
import type { Category, Workout } from './types';

/**
 * Categories shown on "Workout Categories". Artwork comes from the five
 * category photographs exported from the Figma Categories frame.
 */
export const categories: Category[] = [
  { id: 'strength', name: 'Strength', image: 'categoryStrength', workoutCount: 12 },
  { id: 'cardio', name: 'Cardio', image: 'categoryCardio', workoutCount: 9 },
  { id: 'mobility', name: 'Mobility', image: 'categoryMobility', workoutCount: 7 },
  { id: 'core', name: 'Core', image: 'categoryCore', workoutCount: 8 },
  { id: 'full-body', name: 'Full Body', image: 'categoryFullBody', workoutCount: 11 },
];

export const categoriesById: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.id, category])
);

/**
 * Workout library. `image` values are the Figma photographs for the Workout
 * Plan hero, Library hero/cards and Saved hero/cards.
 */
export const workouts: Workout[] = [
  {
    id: 'full-body-power',
    name: 'Full Body Power',
    description:
      'A complete strength session covering every major movement pattern in one efficient block.',
    categoryId: 'full-body',
    level: 'Advanced',
    durationMin: 45,
    calories: 420,
    image: 'workoutPlanHero',
    exerciseIds: [
      'ex-barbell-squat',
      'ex-bench-press',
      'ex-pull-up',
      'ex-overhead-press',
      'ex-plank',
    ],
  },
  {
    id: 'push-strength',
    name: 'Push Strength',
    description:
      'Chest, shoulders and triceps taken to failure with clean, controlled pressing volume.',
    categoryId: 'strength',
    level: 'Intermediate',
    durationMin: 38,
    calories: 340,
    image: 'categoryStrength',
    exerciseIds: ['ex-bench-press', 'ex-overhead-press', 'ex-plank'],
  },
  {
    id: 'hiit-burner',
    name: 'HIIT Burner',
    description:
      'Short, sharp intervals that keep the heart rate high and the recovery short.',
    categoryId: 'cardio',
    level: 'Advanced',
    durationMin: 28,
    calories: 310,
    image: 'categoryCardio',
    exerciseIds: ['ex-burpee', 'ex-mountain-climber', 'ex-plank'],
  },
  {
    id: 'mobility-flow',
    name: 'Mobility Flow',
    description:
      'A gentle sequence that restores range of motion and reduces training stiffness.',
    categoryId: 'mobility',
    level: 'Beginner',
    durationMin: 22,
    calories: 120,
    image: 'categoryMobility',
    bodyweightOnly: true,
    exerciseIds: ['ex-glute-bridge', 'ex-plank'],
  },
  {
    id: 'core-foundation',
    name: 'Core Foundation',
    description:
      'Build a stable trunk with anti-extension and anti-rotation holds that carry over to every lift.',
    categoryId: 'core',
    level: 'Beginner',
    durationMin: 18,
    calories: 110,
    image: 'categoryCore',
    bodyweightOnly: true,
    exerciseIds: ['ex-plank', 'ex-mountain-climber', 'ex-glute-bridge'],
  },
  {
    id: 'lower-body-build',
    name: 'Lower Body Build',
    description:
      'Squat and hinge patterns for stronger legs, glutes and a sturdier base.',
    categoryId: 'strength',
    level: 'Intermediate',
    durationMin: 42,
    calories: 390,
    image: 'categoryFullBody',
    exerciseIds: ['ex-barbell-squat', 'ex-romanian-deadlift', 'ex-glute-bridge'],
  },
  {
    id: 'beginner-reset',
    name: 'Beginner Reset',
    description:
      'A no-equipment introduction to compound training, built for your first weeks in the gym.',
    categoryId: 'full-body',
    level: 'Beginner',
    durationMin: 30,
    calories: 240,
    image: 'libraryHero',
    bodyweightOnly: true,
    exerciseIds: ['ex-glute-bridge', 'ex-plank', 'ex-burpee', 'ex-mountain-climber'],
  },
  {
    id: 'athlete-conditioning',
    name: 'Athlete Conditioning',
    description:
      'Total-body conditioning that mixes power, capacity and core control in one circuit.',
    categoryId: 'cardio',
    level: 'Advanced',
    durationMin: 35,
    calories: 400,
    image: 'savedHero',
    exerciseIds: ['ex-burpee', 'ex-pull-up', 'ex-mountain-climber', 'ex-plank'],
  },
  {
    id: 'upper-pull',
    name: 'Upper Pull',
    description:
      'Back and biceps volume with strict form and a long, controlled eccentric.',
    categoryId: 'strength',
    level: 'Intermediate',
    durationMin: 36,
    calories: 320,
    image: 'libraryCard1',
    exerciseIds: ['ex-pull-up', 'ex-dumbbell-row', 'ex-plank'],
  },
  {
    id: 'quick-core',
    name: 'Quick Core',
    description: 'Six minutes of focused core work for days you are short on time.',
    categoryId: 'core',
    level: 'Beginner',
    durationMin: 6,
    calories: 45,
    image: 'libraryCard2',
    bodyweightOnly: true,
    exerciseIds: ['ex-plank'],
  },
  {
    id: 'endurance-build',
    name: 'Endurance Build',
    description:
      'Longer intervals to push your aerobic ceiling and your recovery threshold.',
    categoryId: 'cardio',
    level: 'Intermediate',
    durationMin: 40,
    calories: 430,
    image: 'libraryCard3',
    bodyweightOnly: true,
    exerciseIds: ['ex-mountain-climber', 'ex-burpee', 'ex-glute-bridge'],
  },
];

export const workoutsById: Record<string, Workout> = Object.fromEntries(
  workouts.map((workout) => [workout.id, workout])
);

export function getWorkout(id: string): Workout | undefined {
  return workoutsById[id];
}

export function getCategory(id: string): Category | undefined {
  return categoriesById[id];
}

export function workoutsForCategory(categoryId: string): Workout[] {
  return workouts.filter((workout) => workout.categoryId === categoryId);
}

/** Figma's library filter row. */
export const WORKOUT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'bodyweight', label: 'Bodyweight' },
] as const;

export type WorkoutFilter = (typeof WORKOUT_FILTERS)[number]['id'];

export function filterWorkouts(filter: WorkoutFilter): Workout[] {
  switch (filter) {
    case 'beginner':
      return workouts.filter((w) => w.level === 'Beginner');
    case 'intermediate':
      return workouts.filter((w) => w.level === 'Intermediate');
    case 'advanced':
      return workouts.filter((w) => w.level === 'Advanced');
    case 'bodyweight':
      return workouts.filter((w) => w.bodyweightOnly);
    default:
      return workouts;
  }
}

/** Extra images referenced by the library/saved rails. */
export const railImages = {
  libraryCard1: images.libraryCard1,
  libraryCard2: images.libraryCard2,
  libraryCard3: images.libraryCard3,
  savedCard1: images.savedCard1,
  savedCard2: images.savedCard2,
} as const;