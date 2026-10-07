import type { PlanDay } from './types';

/**
 * The generated weekly plan. Drives the Home "Today's plan" card, the weekly
 * day strip and the Workout Plan tab root. Artwork is the Figma hero plus the
 * two plan-card photographs and the three plan-exercise thumbnails.
 */
export const planWeek: PlanDay[] = [
  {
    id: 'mon',
    day: 'M',
    dateLabel: 'Mon 12',
    title: 'Upper Body Strength',
    focus: 'Chest · Back · Shoulders',
    durationMin: 42,
    exerciseCount: 6,
    image: 'workoutPlanHero',
    completed: true,
    isToday: false,
  },
  {
    id: 'tue',
    day: 'T',
    dateLabel: 'Tue 13',
    title: 'Lower Body Build',
    focus: 'Quads · Hamstrings · Glutes',
    durationMin: 38,
    exerciseCount: 5,
    image: 'homePlanA',
    completed: false,
    isToday: true,
  },
  {
    id: 'wed',
    day: 'W',
    dateLabel: 'Wed 14',
    title: 'Active Recovery',
    focus: 'Mobility · Flow',
    durationMin: 22,
    exerciseCount: 4,
    image: 'homePlanB',
    completed: false,
    isToday: false,
  },
  {
    id: 'thu',
    day: 'T',
    dateLabel: 'Thu 15',
    title: 'Upper Body Volume',
    focus: 'Chest · Arms',
    durationMin: 40,
    exerciseCount: 6,
    image: 'planExercise1',
    completed: false,
    isToday: false,
  },
  {
    id: 'fri',
    day: 'F',
    dateLabel: 'Fri 16',
    title: 'Full Body Power',
    focus: 'Full Body',
    durationMin: 45,
    exerciseCount: 5,
    image: 'planExercise2',
    completed: false,
    isToday: false,
  },
  {
    id: 'sat',
    day: 'S',
    dateLabel: 'Sat 17',
    title: 'Core Intervals',
    focus: 'Core · Conditioning',
    durationMin: 18,
    exerciseCount: 3,
    image: 'planExercise3',
    completed: false,
    isToday: false,
  },
  {
    id: 'sun',
    day: 'S',
    dateLabel: 'Sun 18',
    title: 'Rest Day',
    focus: 'Recover',
    durationMin: 0,
    exerciseCount: 0,
    image: 'homePlanB',
    completed: false,
    isToday: false,
  },
];

export const todayPlan: PlanDay = planWeek.find((day) => day.isToday) ?? planWeek[1];

/** Exercises previewed on the plan cards (Figma "Plan exercise" thumbnails). */
export const planExerciseImages = [
  'planExercise1',
  'planExercise2',
  'planExercise3',
] as const;

/** Goal options for the Personalization wizard and Profile → My Goals. */
export const goalOptions = [
  {
    id: 'strength',
    label: 'Build Strength',
    detail: 'Lift heavier and move better.',
    icon: 'trending-up',
  },
  {
    id: 'fat-loss',
    label: 'Lose Fat',
    detail: 'Burn calories with steady training.',
    icon: 'activity',
  },
  {
    id: 'endurance',
    label: 'Build Endurance',
    detail: 'Go longer without fatigue.',
    icon: 'wind',
  },
  {
    id: 'consistency',
    label: 'Stay Consistent',
    detail: 'Make training a habit.',
    icon: 'calendar',
  },
] as const;

export const levelOptions = [
  { id: 'beginner', label: 'Beginner', detail: 'New to structured training.' },
  { id: 'intermediate', label: 'Intermediate', detail: 'Training regularly for a while.' },
  { id: 'advanced', label: 'Advanced', detail: 'Comfortable with heavy loads.' },
] as const;

export const preferenceOptions = [
  { id: 'gym', label: 'Gym', detail: 'Full equipment access.' },
  { id: 'home', label: 'Home', detail: 'Minimal or no equipment.' },
  { id: 'outdoor', label: 'Outdoor', detail: 'Parks, streets and trails.' },
] as const;

export const equipmentOptions = [
  { id: 'none', label: 'No equipment' },
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'bands', label: 'Resistance bands' },
  { id: 'bench', label: 'Bench' },
  { id: 'pullup-bar', label: 'Pull-up bar' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'roll', label: 'Foam roller' },
] as const;

export const scheduleOptions = [
  { id: '2', label: '2 days', detail: 'Light frequency' },
  { id: '3', label: '3 days', detail: 'Balanced routine' },
  { id: '4', label: '4 days', detail: 'Build momentum' },
  { id: '5', label: '5 days', detail: 'High frequency' },
] as const;

export const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;