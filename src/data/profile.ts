import type { UserProfile } from './types';

/** Mock profile backing the Profile, Edit Profile and My Goals screens. */
export const profile: UserProfile = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@email.com',
  avatar: 'profileAvatar',
  bio: 'Training four days a week. Focused on getting stronger without wasting time.',
  memberSince: 'August 2026',
  level: 'Intermediate',
  goalId: 'strength',
  heightCm: 178,
  weightKg: 78.4,
  stats: {
    workoutsCompleted: 164,
    totalMinutes: 5240,
    caloriesBurned: 49600,
    currentStreak: 9,
  },
};

export const profileStats = [
  {
    id: 'workouts',
    label: 'Workouts',
    value: '164',
    icon: 'activity',
  },
  { id: 'minutes', label: 'Active minutes', value: '5,240', icon: 'clock' },
  { id: 'calories', label: 'Calories', value: '49,600', icon: 'zap' },
  { id: 'streak', label: 'Day streak', value: '9', icon: 'award' },
] as const;

/** Physical details on the Profile screen. */
export const profileDetails = [
  { id: 'level', label: 'Fitness level', value: 'Intermediate', icon: 'bar-chart-2' },
  { id: 'goal', label: 'Primary goal', value: 'Build Strength', icon: 'target' },
  { id: 'height', label: 'Height', value: '178 cm', icon: 'maximize-2' },
  { id: 'weight', label: 'Weight', value: '78.4 kg', icon: 'activity' },
  { id: 'schedule', label: 'Weekly schedule', value: '4 days', icon: 'calendar' },
  { id: 'equipment', label: 'Equipment', value: 'Full gym', icon: 'tool' },
] as const;

/** Preferences surfaced by Settings → App Preferences. */
export const appPreferenceOptions = [
  {
    id: 'units',
    label: 'Units',
    value: 'Metric (kg, cm)',
    options: ['Metric (kg, cm)', 'Imperial (lb, in)'],
    icon: 'maximize-2',
  },
  {
    id: 'week-start',
    label: 'Week starts on',
    value: 'Monday',
    options: ['Monday', 'Sunday'],
    icon: 'calendar',
  },
  {
    id: 'reminder-time',
    label: 'Workout reminder',
    value: '07:00',
    options: ['06:00', '07:00', '18:00', '19:00'],
    icon: 'clock',
  },
] as const;

export const aboutRows = [
  { id: 'version', label: 'Version', value: '1.0.0 (1)' },
  { id: 'build', label: 'Build', value: 'Expo SDK 57' },
  { id: 'platform', label: 'Platform', value: 'Android' },
] as const;

export const helpTopics = [
  {
    id: 'getting-started',
    label: 'Getting started',
    detail: 'Set up your first plan and learn the basics.',
    icon: 'compass',
  },
  {
    id: 'plans',
    label: 'Workout plans',
    detail: 'How your generated plan adapts to your schedule.',
    icon: 'calendar',
  },
  {
    id: 'exercises',
    label: 'Exercises & form',
    detail: 'Technique cues and how to scale any movement.',
    icon: 'activity',
  },
  {
    id: 'tracking',
    label: 'Tracking progress',
    detail: 'Read your charts, streaks and achievements.',
    icon: 'bar-chart-2',
  },
  {
    id: 'account',
    label: 'Account & privacy',
    detail: 'Manage your data and preferences.',
    icon: 'lock',
  },
  {
    id: 'contact',
    label: 'Contact support',
    detail: 'We usually reply within one business day.',
    icon: 'message-circle',
  },
] as const;

export const faqs = [
  {
    id: 'faq-1',
    question: 'How is my plan generated?',
    answer:
      'Your plan combines your goal, fitness level, equipment and weekly schedule into a balanced split. You can regenerate it at any time from My Goals.',
  },
  {
    id: 'faq-2',
    question: 'Can I train without a gym?',
    answer:
      'Yes. Choose Home during setup and every session will use bodyweight movements only. You can switch later in App Preferences.',
  },
  {
    id: 'faq-3',
    question: 'Does DIV need an internet connection?',
    answer:
      'No. Your plan and history are stored on the device, so workouts run entirely offline.',
  },
  {
    id: 'faq-4',
    question: 'How do streaks work?',
    answer:
      'A streak counts consecutive days with at least one completed session. Rest days that you have scheduled do not break it.',
  },
] as const;