import type { ImageKey } from '@/assets/photos';
import type { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Feather>['name'];

export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Exercise = {
  id: string;
  name: string;
  /** Muscle group label from the design's meta line. */
  muscle: string;
  sets?: number;
  /** Repetition count, when the design shows a rep target. */
  reps?: number;
  /** Timed exercise duration in seconds. */
  durationSec?: number;
  restSec: number;
  image: ImageKey;
  description: string;
  instructions: string[];
  /** Form cues rendered as a checklist on the exercise detail screen. */
  cues: string[];
};

export type Workout = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  level: FitnessLevel;
  durationMin: number;
  /** Estimated burn shown on the detail screen. */
  calories: number;
  image: ImageKey;
  exerciseIds: string[];
  /** Trainers tag the routine as equipment-free. */
  bodyweightOnly?: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: ImageKey;
  workoutCount: number;
};

/** One day of the generated plan (Home "Today's plan", Workouts tab root). */
export type PlanDay = {
  id: string;
  /** Short weekday label used on the weekly strip. */
  day: string;
  dateLabel: string;
  title: string;
  focus: string;
  durationMin: number;
  exerciseCount: number;
  image: ImageKey;
  completed: boolean;
  isToday: boolean;
};

export type GoalOption = {
  id: string;
  label: string;
  detail: string;
  icon: IconName;
};

export type VolumePoint = {
  label: string;
  value: number;
  active?: boolean;
};

export type StatSummary = {
  label: string;
  value: string;
  hint?: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  unlocked: boolean;
  /** 0..1 for locked badges showing partial progress. */
  progress?: number;
  unlockedLabel?: string;
};

export type CalendarDay = {
  /** Day-of-month number, or 0 for a leading/trailing pad cell. */
  day: number;
  hasWorkout: boolean;
  completed: boolean;
  isToday: boolean;
};

export type ProfileStats = {
  workoutsCompleted: number;
  totalMinutes: number;
  caloriesBurned: number;
  currentStreak: number;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: ImageKey;
  bio: string;
  memberSince: string;
  level: FitnessLevel;
  goalId: string;
  heightCm: number;
  weightKg: number;
  stats: ProfileStats;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  /** Relative timestamp shown under the title. */
  time: string;
  icon: IconName;
  read: boolean;
};